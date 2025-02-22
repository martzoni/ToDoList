function CategorySelector({ selected, onSelect }) {
	const categories = ['Tout', 'Personnel', 'Travail', 'Courses'];

	return (
	  <div style={{ margin: '1rem' }}>
		{categories.map(category => (
		  <button
			key={category}
			onClick={() => onSelect(category)}
			style={{
			  margin: '0 0.5rem',
			  padding: '0.5rem',
			  backgroundColor: selected === category ? '#333' : '#f0f0f0',
			  color: selected === category ? 'white' : 'black',
			  border: 'none',
			  borderRadius: '3px',
			  cursor: 'pointer'
			}}
		  >
			{category}
		  </button>
		))}
	  </div>
	);
  }

  export default CategorySelector;
