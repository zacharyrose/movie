import React, { Component } from 'react';

import { connect } from 'react-redux';
class MovieDetail extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        Movie ID: {this.props.match.params.movieId}
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)
