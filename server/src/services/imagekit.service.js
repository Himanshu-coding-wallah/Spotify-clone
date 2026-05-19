import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

export async function uploadToImageKit(buffer){
    try {
        const response = await client.files.upload({
            file: buffer,
            fileName: 'music_' + Date.now(),
            folder: 'spotify-clone/music'
        });
        return response    
    } catch (error) {
        console.log(error)
    }
}