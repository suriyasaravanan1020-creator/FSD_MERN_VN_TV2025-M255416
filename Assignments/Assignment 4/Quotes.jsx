import React, { useEffect, useState } from "react";
import axios from "axios";
function Quotes() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/quotes/random/10");
      setQuotes(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div>
      
          
           <table className="table border">
           <thead>
             <tr>
                <th className="table-primary" scope="col">Id</th>
                <th className="table-primary" scope="col">Author</th>
                <th className="table-primary" scope="col">Quote</th>
            </tr>
           </thead>
           {quotes.map((element) => {
        return (
            <tbody>
                <tr>
                <td className="table-dark">{element.id}</td>
                <td className="table-dark">{element.author}</td>
                <td className="table-dark">{element.quote}</td>
                
            </tr>
            </tbody>
            );})}
           </table>
          
       
      
    </div>
  );
}

export default Quotes;


