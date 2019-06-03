import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import { ReactComponent as StarBorder } from '../../svg/star-border.svg'
import { ReactComponent as Star } from '../../svg/star.svg'

import api from '../api'

const style = () => ({
  star: {
    width: 40,
    cursor: 'pointer'
  }
})

class RatingReviewModal extends Component {
  state = {
    starCount: 0,
    comment: ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'],
    review: ''
  }

  handleStarClick = value => {
    this.setState({
      starCount: value
    })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  renderStars = props => {
    const { starCount } = this.state
    const stars = [1, 2, 3, 4, 5]
    const {
      classes: { star: starStyle }
    } = props

    return stars.map(star => {
      if (star > starCount) {
        return (
          <StarBorder
            key={`star-${star}`}
            onClick={() => this.handleStarClick(star)}
            className={starStyle}
          />
        )
      } else {
        return (
          <Star
            key={`star-${star}`}
            onClick={() => this.handleStarClick(star)}
            className={starStyle}
            style={{
              fill: '#8E2DE2'
            }}
          />
        )
      }
    })
  }

  handleFinalSubmit = async event => {
    event.preventDefault()
    const { starCount, review } = this.state
    const { data: result } = await api.post('/callout/customer/complete', {
      rating: starCount,
      comment: review
    })
    if (result.success) {
      const { handleInnerChange } = this.props
      handleInnerChange({
        loadingResponse: false,
        confirmProfessional: null
      })
    } else {
      alert(result.error)
    }
  }

  render() {
    const { starCount, comment, review } = this.state
    const {
      confirmProfessional: { fullName }
    } = this.props
    return (
      <div>
        <DialogTitle>{`Rating and Review for ${fullName}`}</DialogTitle>
        <DialogContent>
          <div
            style={{
              width: 200,
              margin: '0 auto'
            }}
          >
            {this.renderStars(this.props)}
            <Typography
              variant="h6"
              align="center"
              color="primary"
              gutterBottom
            >
              {starCount !== 0 && comment[starCount - 1]}
            </Typography>
          </div>
          <DialogContentText
            style={{
              marginTop: 8
            }}
          >
            You can also provide an optional review
          </DialogContentText>
          <TextField
            id="review"
            name="review"
            onChange={this.handleChange}
            value={review}
            label="Review"
            placeholder="Write a review"
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={this.handleFinalSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </div>
    )
  }
}

export default withStyles(style)(RatingReviewModal)
