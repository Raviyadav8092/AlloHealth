import React from 'react';

const MealList = ({
  meals,
  selectedMeals,
  selectMeal,
  deselectMeal,
  selectedPerson,
}) => {
  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-card">
          <div className="meal-image">
            <img src={meal.img} height="200" width="300" alt={meal.title} />
          </div>
          <div className="meal-details">
            <h2>{meal.title}</h2>
            <p>Price: ${meal.price.toFixed(2)}</p>
            {selectedPerson ? (
              <button
                onClick={() => selectMeal(meal.id)}
                disabled={selectedMeals.some(
                  (selectedMeal) =>
                    selectedMeal.id === meal.id &&
                    selectedMeal.person === selectedPerson
                )}
              >
                Select
              </button>
            ) : (
              <p>Select a person first</p>
            )}
            {selectedMeals.some(
              (selectedMeal) =>
                selectedMeal.id === meal.id &&
                selectedMeal.person === selectedPerson
            ) && (
              <button onClick={() => deselectMeal(meal.id)}>Deselect</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealList;
