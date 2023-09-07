import React, { useState, useEffect } from 'react';
import './App.css';
import mealsData from './meals.json';
import ReactPaginate from 'react-paginate';
import MealList from './components/MealList';
import TagFilter from './components/TagsFilter';
import PersonSelector from './components/PersonList';
import TotalPrice from './components/TotalPrice';

function App() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); 
  const itemsPerPage = 4; 

  useEffect(() => {
    setMeals(mealsData.mealsData);
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) =>
        meal.labels.some((label) => selectedTags.includes(label))
      );
      setFilteredMeals(filtered);
    }
  }, [selectedTags, meals]);

  const filterMealsByTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const selectMeal = (mealId) => {
    if (!selectedPerson) {
      alert('Please select a person first.');
      return;
    }

    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;

    const updatedSelectedMeals = [...selectedMeals];
    const existingMealIndex = updatedSelectedMeals.findIndex(
      (m) => m.id === mealId && m.person === selectedPerson
    );

    if (existingMealIndex !== -1) {
      updatedSelectedMeals[existingMealIndex].quantity++;
    } else {
      updatedSelectedMeals.push({ ...meal, person: selectedPerson, quantity: 1 });
    }

    setSelectedMeals(updatedSelectedMeals);
  };

  const deselectMeal = (mealId) => {
    const updatedSelectedMeals = selectedMeals.filter(
      (meal) => !(meal.id === mealId && meal.person === selectedPerson)
    );
    setSelectedMeals(updatedSelectedMeals);
  };

  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const mealsToDisplay = filteredMeals.slice(startIndex, endIndex);

  const calculateTotalPrice = () => {
    return selectedMeals.reduce((total, meal) => total + meal.price * meal.quantity, 0);
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <h1>Food Order App</h1>
      <div className="filters">
        <TagFilter
          labels={mealsData.labels}
          selectedTags={selectedTags}
          filterMealsByTag={filterMealsByTag}
        />
        <PersonSelector setSelectedPerson={setSelectedPerson} />
      </div>
      <MealList
        meals={mealsToDisplay}
        selectedMeals={selectedMeals}
        selectMeal={selectMeal}
        deselectMeal={deselectMeal}
        selectedPerson={selectedPerson}
      />
      <TotalPrice totalPrice={calculateTotalPrice()} />

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredMeals.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App;
