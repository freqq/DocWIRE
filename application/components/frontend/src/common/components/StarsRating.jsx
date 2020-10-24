/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import 'common/components/StarsRating.css';

const StartRating = ({ rating, id, onClick }) => (
  <div id="full-stars-example-two">
    <div className="rating-group">
      <input
        disabled
        checked
        className="rating__input rating__input--none"
        name={id}
        id="rating3-none"
        value={rating}
        type="radio"
      />
      <label
        aria-label="1 star"
        className="rating__label"
        htmlFor="rating3-1"
        onClick={() => onClick(1)}
      >
        <i className="rating__icon rating__icon--star fa fa-star" />
      </label>
      <input className="rating__input" name={id} id="rating3-1" value="1" type="radio" />
      <label
        aria-label="2 stars"
        className="rating__label"
        htmlFor="rating3-2"
        onClick={() => onClick(2)}
      >
        <i className="rating__icon rating__icon--star fa fa-star" />
      </label>
      <input className="rating__input" name={id} id="rating3-2" value="2" type="radio" />
      <label
        aria-label="3 stars"
        className="rating__label"
        htmlFor="rating3-3"
        onClick={() => onClick(3)}
      >
        <i className="rating__icon rating__icon--star fa fa-star" />
      </label>
      <input className="rating__input" name={id} id="rating3-3" value="3" type="radio" />
      <label
        aria-label="4 stars"
        className="rating__label"
        htmlFor="rating3-4"
        onClick={() => onClick(4)}
      >
        <i className="rating__icon rating__icon--star fa fa-star" />
      </label>
      <input className="rating__input" name={id} id="rating3-4" value="4" type="radio" />
      <label
        aria-label="5 stars"
        className="rating__label"
        htmlFor="rating3-5"
        onClick={() => onClick(5)}
      >
        <i className="rating__icon rating__icon--star fa fa-star" />
      </label>
      <input className="rating__input" name={id} id="rating3-5" value="5" type="radio" />
    </div>
  </div>
);

StartRating.propTypes = {
  rating: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StartRating;
