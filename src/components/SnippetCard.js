import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Box,
  TextField,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon
} from '@mui/icons-material';

function SnippetCard({ snippet: initialSnippet }) {
  const [snippet, setSnippet] = useState(initialSnippet);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user, addNotification } = useAuth();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setSnippet(prev => ({
      ...prev,
      likes: prev.likes + (isLiked ? -1 : 1)
    }));

    if (!isLiked && snippet.author !== user.username) {
      addNotification({
        message: `@${user.username} liked your snippet "${snippet.title}"`,
        type: 'LIKE',
        snippetId: snippet.id
      });
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText.trim(),
      author: user.username,
      date: new Date().toISOString()
    };

    setSnippet(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));

    if (snippet.author !== user.username) {
      addNotification({
        message: `@${user.username} commented on your snippet "${snippet.title}"`,
        type: 'COMMENT',
        snippetId: snippet.id
      });
    }

    setCommentText('');
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {snippet.author[0].toUpperCase()}
          </Avatar>
        }
        title={snippet.title}
        subheader={
          <Box component="span" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              @{snippet.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDistanceToNow(new Date(snippet.date), { addSuffix: true })}
            </Typography>
          </Box>
        }
      />

      <CardContent>
        <Box
          component="pre"
          sx={{
            backgroundColor: 'grey.900',
            color: 'grey.100',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            '& code': {
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: '0.875rem',
            }
          }}
        >
          <code>{snippet.code}</code>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton 
          onClick={handleLike}
          color={isLiked ? 'primary' : 'default'}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {snippet.likes}
        </Typography>
        
        <IconButton 
          onClick={() => setShowComments(!showComments)}
          sx={{ ml: 1 }}
        >
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {snippet.comments.length}
        </Typography>
      </CardActions>

      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleComment}>
            <TextField
              fullWidth
              size="small"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!commentText.trim()}
              size="small"
            >
              Post
            </Button>
          </form>

          <List sx={{ mt: 2 }}>
            {snippet.comments.map(comment => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {comment.author[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box component="span" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography component="span" variant="subtitle2">
                        @{comment.author}
                      </Typography>
                      <Typography component="span" variant="caption" color="text.secondary">
                        {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                      </Typography>
                    </Box>
                  }
                  secondary={comment.text}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Collapse>
    </Card>
  );
}

export default SnippetCard; 