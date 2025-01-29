import { getProperties, remove, uploadData } from 'aws-amplify/storage';
import { X } from 'lucide-react';
import { useState } from 'react';
import { CreateRaffleInput, UpdateRaffleInput } from '../../API';

export const Stage2 = ({
  updateForm,
  raffle,
  children,
}: {
  updateForm: (images: string[]) => void;
  raffle: CreateRaffleInput | UpdateRaffleInput;
  children: React.ReactNode;
}) => {
  const [images, setImages] = useState<string[]>(raffle?.images || []);
  const [error, setError] = useState('');
  const [replace, setReplace] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    try {
      const result = await getProperties({
        path: 'public/' + file.name,
      });
      if (result.path) {
        setError('File already exists, submit again to replace');
      }

      // Return with warning
      // set state to replace file
      if (!replace) {
        setReplace(file.name);
        return;
      }
    } catch (error) {
      console.log('Error ', error);
    }

    try {
      const result = await uploadData({
        key: file.name,
        data: file,
        // options: {
        //     accessLevel: 'private'
        // }
      }).result;

      setError('');
      setReplace('');
      setImages([
        'https://ratclub-raffle-images32888-staging.s3.us-east-1.amazonaws.com/public/' +
          result.key,
      ]);
    } catch (error) {
      setError('Error uploading image');
      console.log('Error : ', error);
    }
  };

  const handleRemoveImage = async () => {
    try {
      await remove({
        path: images[0].replace(
          'https://ratclub-raffle-images32888-staging.s3.us-east-1.amazonaws.com/',
          '',
        ),
      });
    } catch (error) {
      console.log('Error : ', error);
    }
    setImages([]);
  };

  const handleSubmit = async () => {
    // Update form values
    updateForm(images);
  };

  return (
    <form className='space-y-4 rounded-sm border p-4' onSubmit={handleSubmit}>
      {images.length > 0 && (
        <div className='relative flex items-center justify-center rounded-sm border p-2'>
          {images.map((img) => (
            <img className='max-h-52' key={img} src={img} />
          ))}
          <a
            onClick={handleRemoveImage}
            className='background-black absolute right-2 top-2 cursor-pointer rounded-full border p-1'
          >
            <X />
          </a>
        </div>
      )}
      <div className='flex justify-between'>
        <label className='block text-sm font-medium'>Image (optional)</label>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
      <input
        type='file'
        pattern='.*\.(gif|jpe?g|tiff?|png|webp|bmp)'
        onChange={handleImageUpload}
        value={''}
        className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 sm:text-sm'
      />
      {/* </div> */}
      {children}
    </form>
  );
};
