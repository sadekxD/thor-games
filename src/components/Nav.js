import React, { useState } from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Logo Image
import logo from "../img/logo.svg";
// Redux and Routes
import { fetchSearch } from "../actions/gamesActions";
import { useDispatch } from "react-redux";
import { fadeIn } from "../animations";

const Nav = () => {
	const dispatch = useDispatch();
	const [textInput, setTextInput] = useState("");

	const inputHandler = (e) => {
		setTextInput(e.target.value);
	};

	const submitSearch = (e) => {
		e.preventDefault();
		dispatch(fetchSearch(textInput));
		setTextInput("");
	};

	const clearSearched = () => {
		dispatch({
			type: "CLEAR_SEARCHED",
		});
	};

	return (
		<StyledNav variants={fadeIn} initial="hidden" animate="show">
			<Logo onClick={clearSearched}>
				<img src={logo} alt="logo" />
				<h1>Thor</h1>
			</Logo>
			<form className="search">
				<input value={textInput} onChange={inputHandler} type="text" />
				<button onClick={submitSearch} type="submit">
					Search
				</button>
			</form>
		</StyledNav>
	);
};

const StyledNav = styled(motion.nav)`
	padding: 3rem 1rem;
	text-align: center;

	form {
		max-width: 400px;
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0px 17px 30px rgba(0, 0, 0, 0.2);

		input {
			flex-grow: 1;
			font-size: 1rem;
			border: none;
			/* box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2); */
			font-weight: bold;
			padding: 0.5rem 0.5rem;
			font-family: "Montserrat", sans-serif;

			&:focus {
				outline: none;
			}
		}
		button {
			font-size: 1rem;
			border: none;
			padding: 0.5rem 1rem;
			cursor: pointer;
			background: #ff7676;
			color: white;
			font-family: "Montserrat", sans-serif;
		}
	}
`;

const Logo = styled(motion.div)`
	display: flex;
	justify-content: center;
	padding: 1rem;
	cursor: pointer;
	img {
		height: 2rem;
		width: 2rem;
	}
`;

export default Nav;
