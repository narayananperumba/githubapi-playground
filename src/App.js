import React, { useState, useEffect } from 'react';
import './App.css';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  page: {
    display: 'flex',
    flexFlow: 'wrap',
  },
  card: {
    display: 'flex',
    flex: '1 0 auto',
    minWidth: 275,
    margin: 4,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 475,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cover: {
    width: 110,
    height: 110,
    margin: 5,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto',
  },
  avatarLink: {
    margin: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function App() {

  const classes = useStyles();
  const [searchInput, setSearchInput] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [itemsCount, setItemsCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.github.com/search/repositories?q="${searchInput}"`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setData(data)
      })
      .catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  }

  const setData = ({ total_count, items }) => {
    setLoading(false);
    setItemsCount(total_count);
    setItems(items);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Search Github Repositories
          </Typography>
          <form onSubmit={handleSearch}>
            <div className={classes.search}>
              <div className={classes.searchIcon} onClick={handleSearch}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search repos"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInput}
                value={searchInput}
                required={true}
              />
            </div>
          </form>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Grid className={classes.root}>
        {loading ? <LinearProgress /> : ''}
        <div className={classes.page}>
          {itemsCount ?
            items.map((res, _) => (
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      <span style={{ textTransform: 'capitalize' }}>{res.name} </span> ({res.full_name})
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {res.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {res.language}
                    </Typography>
                    <Typography noWrap variant="body2" component="p" color="textPrimary">
                      {res.description}
                    </Typography>
                    <Typography variant="body2" component="p" color="textSecondary">
                      Stargazers: {res.stargazers_count}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href={res.html_url} rel="noopener" target="_blank" color="primary" size="small">Learn More</Button>
                  </CardActions>
                </div>
                <a className={classes.avatarLink} href={res.owner.html_url}>
                  <Avatar className={classes.avatar} alt={res.owner.login} title={res.owner.login} src={res.owner.avatar_url} />
                </a>
              </Card>
            )) :
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent>
                  No repos found! Try again with some other keywords :)
            </CardContent>
              </div>
            </Card>
          }
        </div>
      </Grid>
    </div>
  );
}
export default App;