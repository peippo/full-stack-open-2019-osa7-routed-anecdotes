import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import CreateNew from "./components/CreateNew";

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info:
				"https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: "1"
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: "2"
		}
	]);

	const [notification, setNotification] = useState(null);

	const addNew = anecdote => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		setAnecdotes(anecdotes.concat(anecdote));
		setNotification(`A new anecdote ${anecdote.content} created!`);

		setTimeout(() => {
			setNotification(null);
		}, 10000);
	};

	const anecdoteById = id => anecdotes.find(a => a.id === id);

	const vote = id => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
	};

	return (
		<Router>
			<h1>Software anecdotes</h1>
			<Menu />
			{notification !== null && (
				<Notification notification={notification} />
			)}
			<Route
				exact
				path="/"
				render={() => <AnecdoteList anecdotes={anecdotes} />}
			/>
			<Route
				path="/anecdotes/:id"
				render={({ match }) => (
					<Anecdote anecdote={anecdoteById(match.params.id)} />
				)}
			/>
			<Route path="/about" render={() => <About />} />
			<Route
				path="/create-new"
				render={() => <CreateNew addNew={addNew} />}
			/>
			<Footer />
		</Router>
	);
};

export default App;
