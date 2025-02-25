interface NavbarProps {
	title?: string;  // ? signifie optionnel
  }

function Navbar({ title = "Ma Todo List" }: NavbarProps) {
	return (
	  <nav style={{
		padding: '1rem',
		backgroundColor: '#333',

		color: 'white'
	  }}>
		<h1>{title}</h1>
	  </nav>
	);
  }

  export default Navbar;
