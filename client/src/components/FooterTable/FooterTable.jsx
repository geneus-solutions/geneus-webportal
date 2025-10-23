import React from 'react';
import './FooterTable.css';
const FooterTable = ({total}) => {
  return (
    <div className="footer-table-container">
      <table className="footer-table">
        <thead>
          <tr>
            <th></th>
            <th>Calories (kcal)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="goal">
            <td>Your Daily Goal</td>
            <td>{total.goal.calories}</td>
            <td>{total.goal.carbs}</td>
            <td>{total.goal.fat}</td>
            <td>{total.goal.protein}</td>
          </tr>
          <tr className="totals">
            <td>Your Totals</td>
            <td>{total.calories}</td>
            <td>{total.carbs}</td>
            <td>{total.fat}</td>
            <td>{total.protein}</td>
          </tr>
          <tr className="remaining">
            <td>Remaining</td>
            <td className={total.goal.calories > total.calories ?"negative" : "positive"}>{total.goal.calories - total.calories}</td>
            <td className={total.goal.calories > total.calories ?"negative" : "positive"}>{total.goal.carbs - total.carbs}</td>
            <td className={total.goal.calories > total.calories ?"negative" : "positive"}>{total.goal.fat - total.fat}</td>
            <td className={total.goal.calories > total.calories ?"negative" : "positive"}>{total.goal.protein - total.protein}</td>
          </tr>
        </tbody>
      </table>  
    </div>
  );
};

export default FooterTable;
