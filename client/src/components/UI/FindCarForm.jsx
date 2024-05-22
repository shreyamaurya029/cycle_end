import React, {useState} from "react";
import "../../styles/find-car-form.css";
// import { Form, FormGroup } from "reactstrap";  
import { Link } from "react-router-dom";
import carData from "../../assets/data/carData";

// const Card = ({ item }) => {
//   return (
//     <div className="card">
//       <h3>{item.title}</h3>
//       <p>Date: {item.date}</p>
//     </div>
//   );
// };
// const FindCarForm = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   // Filter items based on the date range
//   const filteredItems = carData.filter(item => {
//     return item.date >= startDate && item.date <= endDate;
//   });
//   return (
//     <Form className="form">
//       <div className=" d-flex align-items-center justify-content-between flex-wrap">
//         <FormGroup className="form__group">
//           <h6>Pickup Date</h6>
//           <input type="date" placeholder="Pickup date" required />
//         </FormGroup>
//         <FormGroup className="form__group">
//           <h6>Drop Date</h6>
//           <input type="date" placeholder="Drop date" required />
//         </FormGroup>
//         <FormGroup className="select__group">
//           <h6>Types</h6>
//           <select>
//             <option value="bike">Bike</option>
//             <option value="scooty">Scooty</option>
//             <option value="bicycle">Bicycle</option>
//           </select>
//         </FormGroup>
//         <FormGroup className="form__group">
//           <button className="btn find__car-btn">Find Ride</button>
//         </FormGroup>
//       </div>
//       <div className="container">
//         {carData.map((car)=>{
//             return (
//               <div>{car.carName == 'Pulsar'?car.carName:''}</div>
//               )
//         })}
//       </div>    
//       {filteredItems.map(item => (
//         <Card key={item.id} item={item} />
//       ))}
//     </Form>
//   );
// };
// export default FindCarForm;

function CarList() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const handleFindClick = () => {
    // Filter the car data based on the start and end dates
    const filtered = carData.filter(car => {
      const pickupDate = new Date(car.pickup);
      const dropDate = new Date(car.drop);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      // Check if pickup date is before or equal to end date
      // and drop date is after or equal to start date
      return pickupDate <= endDateObj && dropDate >= startDateObj;
    });

    setFilteredCars(filtered);
  };

  return (
    <div>
      <h2>Enter Dates and Find Available Cars</h2>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </label>

      <button onClick={handleFindClick}>Find</button>
          <h2>Cars Available in Range :</h2>
      <div>
        <ul>
          {filteredCars.map(car => (
            <div class="card">
              <li key={car.id}>{car.carName}
                <button><Link to={`/cars/${car.carName}`}>Rent</Link></button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CarList;