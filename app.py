from flask import Flask, request,render_template, jsonify, session
from flask_bcrypt import Bcrypt 
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from models import db, User
from flask_cors import CORS
from scrape import scrape_reviews
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch




# Import packages
import requests
import pandas as pd
from bs4 import BeautifulSoup
from datetime import datetime
from afinn import Afinn
afinn = Afinn()
from matplotlib import pyplot as plt
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

reviews=[]


tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'oppiethechatbot'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Oppie.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
@app.route("/")
def hello_world():
    return render_template('chat.html')
 
@app.route("/signup", methods=["POST"])
def signup():
    name=request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name,email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "name": new_user.name
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name
    })
 
@app.route('/amazon', methods=['POST'])
def handle_amazon_request():
    try:
        scores=0
        nega=0
        posi=0
        neut=0
        headers = {
            'authority': 'www.amazon.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'en-US,en;q=0.9,bn;q=0.8',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
        }
        reviews_url = request.json["msg"]
        len_page = 4
        num=0
        global reviews
        reviews = []
        while(True):
            def Whole():
                def reviewsHtml(url, len_page):
                    soups = []
                    for page_no in range(1, len_page + 1):
                        params = {
                            'ie': 'UTF8',
                            'reviewerType': 'all_reviews',
                            'filterByStar': 'critical',
                            'pageNumber': page_no,
                        }
                        
                        response = requests.get(url, headers=headers)
                        soup = BeautifulSoup(response.text, 'lxml')
                        soups.append(soup)
                        
                    return soups
                def getReviews(html_data):
                    data_dicts = []
                    boxes = html_data.select('div[data-hook="review"]')
                    for box in boxes:
                        try:
                            name = box.select_one('[class="a-profile-name"]').text.strip()
                        except Exception as e:
                            name = 'N/A'

                        try:
                            stars = box.select_one('[data-hook="review-star-rating"]').text.strip().split(' out')[0]
                        except Exception as e:
                            stars = 'N/A'   

                        try:
                            title = box.select_one('[data-hook="review-title"]').text.strip()
                        except Exception as e:
                            title = 'N/A'

                        try:
                            datetime_str = box.select_one('[data-hook="review-date"]').text.strip().split(' on ')[-1]
                            date = datetime.strptime(datetime_str, '%B %d, %Y').strftime("%d/%m/%Y")
                        except Exception as e:
                            date = 'N/A'

                        try:
                            description = box.select_one('[data-hook="review-body"]').text.strip()


                        except Exception as e:
                            description = 'N/A'
                        data_dict = {
                            'Name' : name,
                            'Stars' : stars,
                            'Title' : title,
                            'Date' : date,
                            'Description' : description
                        }

                        data_dicts.append(data_dict)
                    
                    return data_dicts

                html_datas = reviewsHtml(reviews_url, len_page)
                global reviews
                reviews=[]
                
                for html_data in html_datas:
                    review = getReviews(html_data)
                    reviews += review

            df_reviews = pd.DataFrame(reviews)
            if len(df_reviews.index) == 0 and num<10:
                print("test",num)
                num+=1
                Whole()
            else:
                break
                # return jsonify({"response": "Server not available. please try again"})


        # print(df_reviews)
        
        
        # print(posi,nega,neut,scores)
        df_reviews.to_csv('oppie.csv', index=False)

        df_reviewss = pd.read_csv('oppie.csv')
        for description in df_reviewss['Description']:
            description = description.replace('\n', ' ')
            description = description.replace("'", "")
            if description =='/\n\t/':
                description.split(None,1)[0]

            # print(description)
            scor=afinn.score(description)
            # print(scor)
            scores+=scor
            if scor==0:
                neut+=1
            elif scor>0:
                posi+=1
            else:
                nega+=1
        print(posi+548,nega+221,neut+92,scores)
        # sentiment_labels = ['Positive', 'Negative', 'Neutral']
        # sentiment_counts = [posi, nega, neut]

        # plt.figure(figsize=(8, 6))
        # plt.pie(sentiment_counts, labels=sentiment_labels, autopct='%1.1f%%', startangle=140)
        # plt.title('Sentiment Distribution of Reviews')
        # plt.axis('equal')
        # plt.show()

        # # Plotting star rating distribution
        # plt.figure(figsize=(8, 6))
        # sns.countplot(x='Stars', data=df_reviewss)
        # plt.title('Star Rating Distribution')
        # plt.xlabel('Stars')
        # plt.ylabel('Count')
        # plt.show()

        return jsonify({
            "response": "Amazon request processed successfully",
            "chartData": [posi, nega, neut]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/logout", methods=["GET"])
def logout():
    # Clear the session
    session.clear()
    return  render_template('chat.html')

@app.route("/get", methods=["POST"])
def chat():
    try:
        msg = request.json["msg"]
        input_text = msg

        response = get_Chat_response(input_text)

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_Chat_response(text):
    if "your name" in text.lower():
        return "I am Oppie"
    else:
        for step in range(5):
            new_user_input_ids = tokenizer.encode(str(text) + tokenizer.eos_token, return_tensors='pt')
            bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids
            chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
            return tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)


@app.route('/validate_email_and_name', methods=['POST'])
def validate_email_and_name():
    data = request.json
    email = data.get('email')
    name = data.get('name')

    # Check if user exists with the given email and name
    user = User.query.filter_by(email=email, name=name).first()
    if user:
        return jsonify({'valid': True}), 200
    else:
        return jsonify({'valid': False}), 404

# Endpoint to update password
@app.route('/update_password', methods=['POST'])
def update_password():
    data = request.json
    email = data.get('email')
    new_password = data.get('newPassword')

    # Fetch user by email
    user = User.query.filter_by(email=email).first()
    if user:
        # Update password
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        db.session.commit()
        return jsonify({'message': 'Password updated successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

if __name__ == "__main__":
    app.run(port=5000, debug=True)