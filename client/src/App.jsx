import React from 'react'

function App() {
  // React example
const [questions, setQuestions] = useState([]);
const [sortOrder, setSortOrder] = useState('desc');

const fetchQuestions = async () => {
  const response = await fetch(`/api/questions?sort=${sortOrder}`);
  const data = await response.json();
  setQuestions(data);
};

// Toggle sort order
const toggleSort = () => {
  setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
};

// Usage
<button onClick={toggleSort}>
  Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
</button>









  return (
    <div>App</div>
  )
}

export default App