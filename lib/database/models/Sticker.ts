import { Schema, model, models } from 'mongoose';

const StickerSchema = new Schema({
  uploader: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  stickerUrl: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
})


const Sticker = models.Sticker || model('Sticker', StickerSchema)

export default Sticker