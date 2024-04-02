export default function Validation(values){
    const errors={}
    const email_pattern = /^[a-zA-Z0-9._%+-]+@cemunnar\.ac\.in$/;
    if(values.email===""){
        errors.name="Email is required";

    }
    else if(!email_pattern.test(values.email)){
        errors.email='Please provide a valid Email address';
    }

        errors.email='Please'
return errors; 
}
