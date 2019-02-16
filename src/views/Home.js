import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllMovies } from './state/actions'
import MovieCard from 'components/MovieCard';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    console.log('mounted');
    this.props.getAllMovies()
  }

  render() {
    return (
      <div className='movie-list'>
        <h1><Link to="/test">Test</Link></h1>
        {this.props.movies.map(movie => (
          <MovieCard key = {movie.id} {...movie} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.main.movies,
})

const mapDispatchToProps = dispatch => ({
  getAllMovies: () => dispatch(getAllMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
