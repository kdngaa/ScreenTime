from app.models import db, Video

def seed_videos():
    video1 = Video(
        title='Spicy Vodka Pasta',
        description="Gigi Hadid’s spicy vodka pasta recipe WITHOUT vodka 😛 IT TASTED AMAZING U GUYS",
        thumbnail='https://res.cloudinary.com/dv3gxfdon/image/upload/v1652289293/5929454_qerhyt.jpg',
        uploadFile='https://res.cloudinary.com/dv3gxfdon/video/upload/v1652289140/Ms.merhi_6888091771662880002_kwotmz.mp4',
        userId = 1
    )

    video2 = Video(
        title='Munchkin Cat',
        description='Its all about power',
        thumbnail='https://res.cloudinary.com/dv3gxfdon/image/upload/v1652290154/cat-sofa-relaxing-feline_bsgjqf.jpg',
        uploadFile='https://res.cloudinary.com/dv3gxfdon/video/upload/v1652289654/Munchkin_7044272047068908806_ei7ytb.mp4',
        userId = 1
    )

    video3 = Video (
        title='Elotes',
        description='Responder a @mauriciof.condorc mi boca',
        thumbnail='https://res.cloudinary.com/dv3gxfdon/image/upload/v1652290145/Elote-65Feature_ueoscv.jpg',
        uploadFile='https://res.cloudinary.com/dv3gxfdon/video/upload/v1652289924/Elotes_vwsg0e.mp4',
        userId = 1
    )

    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)

    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
