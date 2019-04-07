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
import React from 'react'
import { Check } from '@material-ui/icons'
import MuiLink from './MuiLink'
import { Link } from 'react-router-dom'

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
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    height: '100%',
    flex: 1
  },
  gridItem: {
    maxWidth: 350,
    margin: '0 uto',
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      flexBasis: '50%'
    }
  },
  listItemText: {
    padding: 0
  }
})

const Pricing = props => {
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
  } = props

  const plans = [
    {
      name: 'Basic Plan',
      price: 'Flexible',
      feature: ['sad', 'ending', 'scene']
    },
    {
      name: 'Premium Plan',
      price: 9.99,
      feature: ['seesaw', 'euphoria', 'dear name']
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
                <MuiLink
                  type={Link}
                  to="/signup"
                  underline="none"
                  style={{
                    marginTop: 'auto'
                  }}
                >
                  <Button variant="contained" color={color} fullWidth>
                    <Typography variant="h6" color="inherit">
                      Get started
                    </Typography>
                  </Button>
                </MuiLink>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </main>
  )
}

export default withStyles(style)(Pricing)
