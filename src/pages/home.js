import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesActions";

import Game from "../components/Game";

// Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useLocation } from "react-router-dom";
import GameDetail from "../components/GameDetail";
import { fadeIn } from "../animations";

const Home = () => {
	//get current location
	const location = useLocation();
	const pathId = location.pathname.split("/")[2];

	// FETCH GAMES
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadGames());
	}, [dispatch]);

	// Get that data
	const { popular, newGames, upcoming, searched } = useSelector(
		(state) => state.games
	);

	return (
		<GameList variants={fadeIn} initial="hidden" animate="show">
			<AnimateSharedLayout type="crossfade">
				<AnimatePresence>
					{pathId && <GameDetail pathId={pathId} />}
				</AnimatePresence>
				{searched.length ? (
					<div className="searched">
						<h2>Searched Games</h2>
						<Games>
							{searched.map((game) => (
								<Game
									name={game.name}
									released={game.released}
									image={game.background_image}
									key={game.id}
									id={game.id}
								/>
							))}
						</Games>
					</div>
				) : (
					""
				)}
				<h2>Upcoming Games</h2>
				<Games>
					{upcoming.map((game) => (
						<Game
							name={game.name}
							released={game.released}
							image={game.background_image}
							key={game.id}
							id={game.id}
						/>
					))}
				</Games>
				<h2>Popular Games</h2>
				<Games>
					{popular.map((game) => (
						<Game
							name={game.name}
							released={game.released}
							image={game.background_image}
							key={game.id}
							id={game.id}
						/>
					))}
				</Games>
				<h2>New Games</h2>
				<Games>
					{newGames.map((game) => (
						<Game
							name={game.name}
							released={game.released}
							image={game.background_image}
							key={game.id}
							id={game.id}
						/>
					))}
				</Games>
			</AnimateSharedLayout>
		</GameList>
	);
};

const GameList = styled(motion.div)`
	padding: 0 5rem;
	h2 {
		padding: 5rem 0;
	}

	@media screen and (max-width: 980px) {
		padding: 0 3rem;
	}

	@media screen and (max-width: 768px) {
		padding: 0 1rem;
	}
`;
const Games = styled(motion.div)`
	min-height: 80vh;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-column-gap: 3rem;
	grid-row-gap: 5rem;
	justify-content: center;

	@media screen and (max-width: 980px) {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
`;

export default Home;
