// import { useState, useEffect } from "react";
// import axios from "axios";
// import Chart from "react-apexcharts";
// import { useLocation } from "react-router-dom";

// function Chat() {
//   const location = useLocation();
//   const { userData } = location.state;
//   const [userInput, setUserInput] = useState("");
//   const [messages, setMessages] = useState([
//     { text: `Oppie : Hello, ${userData.name}! What can I help you with?`, sender: "bot", index: 0 },
//   ]);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/amazon", {
//           msg: userInput,
//         });
//         if (response.data.chartData) {
//           setChartData(response.data.chartData);
//         }
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     // Fetch chart data only if userInput includes "amazon"
//     if (userInput.toLowerCase().includes("amazon")) {
//       fetchData();
//     }
//   }, [userInput]);

//   let userIndex = 0; // Index counter for user messages
//   let botIndex = 1; // Index counter for bot responses
  
//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const addUserInputMessage = () => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: `${userData.name}: ${userInput}`, sender: "user", index: userIndex },
//     ]);
//     setUserInput("");
//     userIndex += 2; // Increment user index by 2 for the next user message
//   };

//   const handleSendMessage = async () => {
//     try {
//       if (userInput.toLowerCase().includes("amazon")) {
//         const response = await axios.post("http://localhost:5000/amazon", {
//           msg: userInput,
//         });
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: "Oppie : " + response.data.response, sender: "bot", index: botIndex },
//         ]);
//       } else {
//         const response = await axios.post("http://localhost:5000/get", {
//           msg: userInput,
//         });
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: "Oppie : " + response.data.response, sender: "bot", index: botIndex },
//         ]);
//       }
//       botIndex += 2; // Increment bot index by 2 for the next bot response
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleCombinedClick = async () => {
//     addUserInputMessage(); // Add user input as a separate message
//     await handleSendMessage(); // Wait for handleSendMessage to complete
//   };

//   return (
//     <div className="box mt-3">
//       <div
//         className="message-list"
//         style={{ overflowY: "auto" }}
//       >
//         {messages.map((message) => (
//           <div
//             key={message.index} // Use the unique index as the key
//             className={`d-flex justify-content-${
//               message.sender === "user" ? "end" : "start"
//             } mb-4`}
//           >
//             <span className={`${message.sender} chat `}>
//               {message.text}
//             </span>
//             {message.sender === "bot" && chartData && (
//               <div className="chart-container">
//                 <Chart
//                   options={{
//                     labels: ['Positive', 'Negative', 'Neutral'],
//                     title: {
//                       text: 'Sentiment Distribution of Reviews'
//                     }
//                   }}
//                   series={chartData}
//                   type="pie"
//                   width="400"
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="input-group">
//         <input
//           type="text"
//           value={userInput}
//           onChange={handleInputChange}
//           placeholder="Type your message"
//         />
//         <button onClick={handleCombinedClick}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
