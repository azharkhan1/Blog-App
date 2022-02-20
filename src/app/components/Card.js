import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { serverURL } from "../../config";
import axios from "axios";
export default function RecipeReviewCard({
  description,
  image,
  title,
  id,
  deleteBlog,
}) {
  const { user, setUser } = useContext(GlobalContext);
  console.log("image", image);

  return (
    <Card sx={{ maxWidth: 345 }} style={{ marginTop: 30 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <Link to={`/blog/${id}`}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Link>
      {user.role === "admin" && (
        <button onClick={() => deleteBlog(id)}>Delete Blog</button>
      )}
      {/* 
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      */}
    </Card>
  );
}
