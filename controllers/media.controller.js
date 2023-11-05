const Imagekit = require('imagekit');
// const { WebConfiguration } = require('imagekit');
// const storage = new imagekit.WebConfiguration({
//     publicKey: 'your_public_key',
//     privateKey: 'your_private_key',
//     urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id'
// });

const imagekit = new Imagekit({
    publicKey: 'public_YAuYNfQzl8vXE4jogNbknw+Ofhc=',
    privateKey: 'private_ep21omPKoOt5HprpfoJQCWKvXAI=',
    urlEndpoint: 'https://ik.imagekit.io/lzrltxx0p'
});

// const uploader = imagekit.uploader();
// const Image = db.model('Image');

exports.uploadImage = async (req, res) => {
    try {
        const { fileName, publicUrl } = await upload(req.file.path, req.body.title);
        const { title, description } = req.body;

        const newImage = await Image.create({
            title,
            description,
            url: publicUrl,
            fileName
        });

        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
        }, { new: true });

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};