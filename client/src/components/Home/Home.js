import React from 'react';
import {AppBar, Button, Container, Grid, Grow, Paper, TextField} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Forms/Form";
import useStyles from "./styles";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPosts, getPostsBySearch} from "../../actions/posts";
import ChipInput from "material-ui-chip-input"
import {useLocation, useNavigate} from "react-router-dom";
import Paginate from "../Paginate";


function useQuery () {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [tag, setTag] = useState([]);



    const handleKeyPress = (e) =>{
        if(e.keyCode === 13){
            searchPost();
        }
    }

    const handleAdd = (tags) => setTag([...tag, tags])
    const handleDelete = (tagToDelete) => setTag(tag.filter((tag) => tag !== tagToDelete))

    const searchPost = () => {
        if(search.trim() || tag){
            dispatch(getPostsBySearch({search, tag: tag.join(',')}))
            navigate(`/posts/search?searchQuery=${search.trim() || 'none'}&tags=${tag.join(',')}`)
        }else{
            navigate('/')
        }
    }
    return (
        <Grow in>
            <Container maxWidth={"xl"} >
                <Grid container  justifyContent={"space-between"} alignItems={"stretch"} spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position={"static"} color={"inherit"}>
                            <TextField
                                name={"search"}
                                variant={"outlined"}
                                label={"Search Memories"}
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}>
                            </TextField>
                            <ChipInput
                                styles={{margin: '10px 0', }}
                                value={tag}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label={"Search Tags"}
                                variant={"outlined"}
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant={"contained"} color={"primary"}>Search</Button>
                        </AppBar> 
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper  elevation={6}>
                            <Paginate page={page}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
