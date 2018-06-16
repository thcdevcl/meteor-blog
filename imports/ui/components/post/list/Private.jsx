import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CardWithTitleAndContent from "../../../layouts/components/card/CardWithTitleAndContent";

import PostForm from "../PostForm";
import PrivatePostItem from "./PrivatePostItem";

const styles = theme => ({
  container: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    overflow: "auto"
  }
});

class Private extends Component {
  state = {
    showButton: false,
    showForm: true
  };

  toggleButton = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  toggleCancel = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      showButton: nextProps.posts.length > 0 ? true : false,
      showForm: nextProps.posts.length > 0 ? false : true
    };
  }

  render() {
    const { classes } = this.props;
    const { showButton, showForm } = this.state;
    return (
      <Grid container className={classes.container} justify="center">
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={8}>
            <Typography variant="title" color="inherit">
              Posts
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
          >
            {showButton && (
              <Button
                variant="flat"
                color="secondary"
                onClick={this.toggleButton}
                className={classes.button}
              >
                +
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {showForm && (
          <Grid item xs={12} style={{ paddingRight: 8 }}>
            <Helmet>
              <title>NOINCOMEDEV | Add Post</title>
              <meta name="Add Post" content="Add Post" />
            </Helmet>
            <CardWithTitleAndContent title="New Post">
              <PostForm handleCancel={this.toggleCancel} />
            </CardWithTitleAndContent>
          </Grid>
        )}
        {this.props.posts.map(post => (
          <Grid item xs={12} key={post._id}>
            <PrivatePostItem post={post} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

Private.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Private);
