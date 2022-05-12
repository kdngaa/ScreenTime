from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        content='Pasta is the best!',
        videoId=1,
        userId= 1
    )

    comment2 = Comment(
        content='I am this cat',
        videoId=2,
        userId= 1
    )

    comment3 = Comment (
        content='More content please',
        videoId=3,
        userId= 1
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
