import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Utils
import { smallImage } from "../utils";
// Images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import gamepad from "../img/gamepad.svg";
import apple from "../img/apple.svg";

// Star images
import starEmpty from "../img/star-empty.png";
import startFull from "../img/star-full.png";

import { popup2 } from "../animations";

const GameDetail = ({ pathId }) => {
	const history = useHistory();
	//Exit Detail
	const exitDetailHandler = (e) => {
		const el = e.target;
		if (el.classList.contains("shadow")) {
			document.body.style.overflow = "auto";
			history.push("/");
		}
		console.log(el);
	};

	//Get Platform Images
	const getPlatform = (platform) => {
		switch (platform) {
			case "PlayStation 4":
				return playstation;
			case "PlayStation 3":
				return playstation;
			case "Xbox One":
				return xbox;
			case "Nintendo Switch":
				return nintendo;
			case "iOS":
				return apple;
			case "PC":
				return steam;
			default:
				return gamepad;
		}
	};

	//Get stars
	const getStars = () => {
		const stars = [];
		const rating = Math.floor(game.rating);
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(<img key={i} src={startFull} alt="star" />);
			} else {
				stars.push(<img key={i} src={starEmpty} alt="start" />);
			}
		}
		return stars;
	};

	//Data
	const { screen, game, isLoading } = useSelector((state) => state.detail);

	return (
		<>
			{!isLoading && (
				<CardShadow className="shadow" onClick={exitDetailHandler}>
					<Detail layoutId={pathId}>
						<Stats>
							<div className="rating">
								<motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
								<p>Rating: {game.rating}</p>
								{getStars()}
							</div>
							<Info>
								<h3>Platforms</h3>
								<Platforms>
									{game &&
										game.platforms.map((data) => (
											<img
												key={data.platform.id}
												src={getPlatform(data.platform.name)}
												alt={data.platform.name}
												title={data.platform.name}
											/>
										))}
								</Platforms>
							</Info>
						</Stats>
						<Media>
							<motion.img
								layoutId={`image ${pathId}`}
								src={game.background_image}
								alt={game.background_image}
							/>
						</Media>
						<Description>
							<p>{game.description_raw}</p>
						</Description>
						<div className="gallary">
							{screen &&
								screen.results.map((screen) => (
									<motion.img
										variants={popup2}
										initial="hidden"
										animate="show"
										key={screen.id}
										src={smallImage(screen.image, 640)}
										alt={screen.image}
									/>
								))}
						</div>
					</Detail>
				</CardShadow>
			)}
		</>
	);
};

const CardShadow = styled(motion.div)`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ff7676;
	}

	&::-webkit-scrollbar-track {
		background-color: white;
	}
`;

const Detail = styled(motion.div)`
	width: 80%;
	border-radius: 1rem;
	padding: 2rem 5rem;
	margin-top: 2rem;
	background: white;
	position: absolute;
	left: 10%;
	color: black;
	z-index: 10;

	@media screen and (max-width: 980px) {
		padding: 0 3rem;
	}

	@media screen and (max-width: 768px) {
		padding: 0 1rem;
	}
`;

const Stats = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	img {
		width: 2rem;
		height: 2rem;
		display: inline;
	}

	@media screen and (max-width: 980px) {
		padding: 0 3rem;
		flex-direction: column;
		align-items: flex-start;
		/* justify-content: space-between; */
	}
`;

const Info = styled(motion.div)`
	text-align: center;

	@media screen and (max-width: 980px) {
		text-align: left;
	}
`;

const Platforms = styled(motion.div)`
	display: flex;
	justify-content: center;
	img {
		margin-left: 3rem;
	}

	@media screen and (max-width: 980px) {
		img {
			margin-left: 0rem;
			margin-right: 1rem;
		}
	}
`;

const Media = styled(motion.div)`
	margin-top: 5rem;
	img {
		width: 100%;
	}
`;

const Description = styled(motion.div)`
	margin: 5rem 0;
`;

export default GameDetail;
