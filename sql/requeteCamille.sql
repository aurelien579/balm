 use Balm;
 
  SELECT 
    Comment.rating, Comment.content, User.firstName
FROM
    Comment,
    User
WHERE
    Comment.idOffer = 1
        AND Comment.idUser = User.id;