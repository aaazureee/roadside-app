import React, { Component } from 'react'
import {
  Divider,
  Grid,
  Paper,
  Typography,
  ListItemText,
  Button,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Check } from '@material-ui/icons'
import MuiLink from './MuiLink'
import { Link } from 'react-router-dom'
import { UserContext } from './Context'

const style = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    height: 400,
    display: 'flex',
    flexDirection: 'column'
  },
  planTitle: {
    marginBottom: 16
  },
  divider: {
    marginTop: 24
  },
  gridLayout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    height: '100%',
    flex: 1
  },
  gridItem: {
    maxWidth: 400,
    margin: '0 auto',
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      flexBasis: '50%'
    }
  },
  listItemText: {
    padding: 0
  }
})

class Pricing extends Component {
  static contextType = UserContext

  selectPlan = planType => {
    const user = this.context
    user.updateUserDetails({
      plan: planType
    })

    // TODO handle payment backend

    // if (planType === 'basic') {

    // } else {

    // }
    alert(
      `You are now subscribed to ${planType[0].toUpperCase() +
        planType.slice(1)} plan`
    )
  }

  renderPlanButton = uiPlan => {
    const user = this.context
    const { plan } = user.userDetails
    let color = uiPlan === 'basic' ? 'primary' : 'secondary'

    // no plan
    if (!plan) {
      return (
        <MuiLink
          type={Link}
          to="/signup"
          underline="none"
          style={{
            marginTop: 'auto'
          }}
        >
          <Button variant="contained" color={color} fullWidth size="large">
            <Typography variant="h6" color="inherit">
              Get started
            </Typography>
          </Button>
        </MuiLink>
      )
    }

    // same plan
    if (plan === uiPlan) {
      return (
        <Button
          variant="contained"
          color={color}
          fullWidth
          size="large"
          style={{
            cursor: 'not-allowed'
          }}
        >
          <Typography variant="h6" color="inherit">
            Current plan
          </Typography>
        </Button>
      )
    }

    if (plan !== uiPlan) {
      return (
        <Button
          variant="contained"
          color={color}
          fullWidth
          size="large"
          onClick={() => this.selectPlan(uiPlan)}
        >
          <Typography variant="h6" color="inherit">
            Subscribe
          </Typography>
        </Button>
      )
    }
  }

  render() {
    const {
      classes: {
        root,
        paper,
        planTitle,
        divider,
        gridLayout,
        gridItem,
        listItemText
      }
    } = this.props

    const plans = [
      {
        name: 'Basic Plan',
        price: 'Flexible',
        feature: ['Unlimited callouts', 'Flat tyres', 'Flat batteries']
      },
      {
        name: 'Premium Plan',
        price: 9.99,
        feature: [
          'All Basic Plan benefits',
          'Fixed price for future requests',
          'Exclusive promotional offers'
        ]
      }
    ]

    return (
      <main className={classNames('mainContent', root)}>
        <Grid container spacing={24} className={gridLayout} alignItems="center">
          {plans.map(plan => {
            let color = plan.name.includes('Basic') ? 'primary' : 'secondary'
            return (
              <Grid item xs={12} className={gridItem} key={plan.name}>
                <Paper className={paper}>
                  <Typography variant="h5" color={color} className={planTitle}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h5" color={color}>
                    {plan.name.includes('Premium') && '$'}
                    <span
                      style={{
                        fontSize: '2.5rem'
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.name.includes('Premium') && '/mo'}
                  </Typography>
                  <Divider className={divider} />

                  <List
                    style={{
                      marginTop: 8
                    }}
                  >
                    {plan.feature.map((feature, index) => (
                      <ListItem disableGutters key={index}>
                        <ListItemIcon>
                          <Check color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          classes={{
                            root: listItemText
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <div
                    style={{
                      marginTop: 'auto'
                    }}
                  >
                    {this.renderPlanButton(
                      plan.name.includes('Basic') ? 'basic' : 'premium'
                    )}
                  </div>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </main>
    )
  }
}

export default withStyles(style)(Pricing)
