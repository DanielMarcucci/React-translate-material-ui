import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import TikalPng from './img/tikal3.png'
import UmgPng from './img/umg.png'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import TimelineIcon from '@material-ui/icons/Timeline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import TranslateIcon from '@material-ui/icons/Translate';
import Toolbar from '@material-ui/core/Toolbar';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Step 2
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: blue[500]
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginBottom: 15,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  changeLanguage: {
    marginLeft: '25%'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    // backgroundColor: red[500],
  },
  cardActions: {
    marginLeft: 10
  },
  image: {
    width: 40,
  },
  imageUMG: {
    width: 200,
    margin: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  main: {
    // zIndex: theme.zIndex.drawer + 1,
    marginTop: 80,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [typedText, setTypedText] = useState()
  const [isSpanish, setIsSpanish] = useState(false)
  const [radio, setRadio] = useState("word")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleTranslate = () => setExpanded(!expanded)
  const handleToggleSpanish = () => setIsSpanish(!isSpanish)
  const handleChange = e => setTypedText(e.target.value)
  const handleChangeRadio = e => setRadio(e.target.value)

  const domain = "http://localhost:3000/words"
  const loadDataWord = value => {
    setIsLoading(true)
    fetch(`${domain}?filter[where][${isSpanish ? 'spanish' : 'kiche'}]=${value}`)
      .then(res => res.json())
      .then(async json => {
        const translateTo = isSpanish ? 'kiche' : 'spanish'
        const jsonData = {
          ...json[0],
          translateText: json[0][translateTo]
        }
        setData(jsonData)
        setExpanded(true)
      })
      .catch(e => {
        setData({ translateText: "", image: "" })
        console.error(e)
      })
      .finally(() => setIsLoading(false))
  }

  const handleSubmit = e => {
    e.preventDefault()
    loadDataWord(typedText)
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window.document.body : undefined;

  const items = [
    { name: 'Traductor', icon: <TranslateIcon /> },
    { name: 'Gráficas', icon: <TimelineIcon /> },
  ]

  // Preparing the chart data
  const chartData = [
    {
      label: "Xsaqarik",
      value: "290"
    },
    {
      label: "Xb’e q’ij.",
      value: "260"
    },
    {
      label: "Jawje k’o wi",
      value: "20"
    },
    {
      label: "kyej",
      value: "280"
    },
    {
      label: "b’atz’",
      value: "115"
    },
    {
      label: "b’alam",
      value: "130"
    },
    {
      label: "chikop",
      value: "30"
    },
    {
      label: "q’uq’",
      value: "30"
    }
  ];

  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "340", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Palabras más buscadas",    //Set the chart caption
        subCaption: "",             //Set the chart subcaption
        xAxisName: "Kiché",           //Set the x-axis name
        yAxisName: "Uso",  //Set the y-axis name
        numberSuffix: "K",
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img src={UmgPng} className={classes.imageUMG} />
      </div>
      {/* <Divider /> */}
      <List>
        {items.map((item, index) => (
          <Link to={"/" + item.name} style={{ color: '#5f5f5f', textDecoration: "none" }}>
            <ListItem button key={index.toString()}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Traductor Kiché - Español
            </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </div>
        <div className={clsx(classes.main)}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Traductor" />
          </Route>
          <Route exact path="/Traductor">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={9} md={9}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <img src={TikalPng} className={classes.image} />
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Bienvenido"
                    subheader={isSpanish ? "Español - Kiché" : "Kiché - Español"}
                  />
                  <form onSubmit={handleSubmit}>
                    <CardContent>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={radio} onChange={handleChangeRadio}>
                          <FormControlLabel value="word" control={<Radio color="primary" />} label="Palabra" />
                          <FormControlLabel value="sentence" control={<Radio color="primary" />} label="Oración" />
                        </RadioGroup>
                      </FormControl>
                      <TextField
                        id="outlined-multiline-static"
                        label={isSpanish ? 'Español' : 'Kiché'}
                        multiline
                        rows={4}
                        variant="outlined"
                        value={typedText}
                        onChange={handleChange}
                        fullWidth
                      />
                    </CardContent>
                    <CardActions className={clsx(classes.cardActions)} disableSpacing>
                      <Button onClick={handleSubmit} variant="contained" color="primary">Traducir</Button>
                      <IconButton aria-label="Cambiar Idioma" className={clsx(classes.changeLanguage)} onClick={handleToggleSpanish}>
                        <SwapHorizIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleToggleTranslate}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                  </form>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {isLoading
                      ? (
                        <h5 style={{ padding: 20 }}>Traduciendo...</h5>
                      ) : (
                        <Grid container>
                          <Grid item md={6}>
                            <CardContent>
                              <Typography paragraph>{data.translateText}</Typography>
                            </CardContent>
                          </Grid>
                          {data.image
                            ? (
                              <Grid item md={6}>
                                <img src={data.image} style={{ maxWidth: '100%' }} />
                              </Grid>
                            ) : (
                              <></>
                            )
                          }
                        </Grid>
                      )
                    }
                  </Collapse>
                </Card>
              </Grid>
            </Grid>

          </Route>
          <Route path="/Gráficas">
            <ReactFC {...chartConfigs} />
          </Route>
        </Switch>
        </div>
      </Router>
    </ThemeProvider >
  );
}
