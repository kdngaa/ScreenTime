from app.models import db, Like

def seed_likes():
    like1 = Like(
        videoId=1,
        userId= 1
    )

    like2 = Like(
        videoId=2,
        userId= 1
    )

    like3 = Like (
        videoId=3,
        userId= 1
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
