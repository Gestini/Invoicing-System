import React from 'react';
import { Input, Switch, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { reqUpdateUnitById } from '@renderer/api/requests';
import toast from 'react-hot-toast';
import { uploadImage } from '@renderer/utils/DigitalOcean/uploadImage';

const Index = () => {
  const unit = useSelector((state: any) => state.currentUnit);
  const [selected, setSelected] = React.useState(unit?.ecommerce || false);
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(unit)
  }, [unit]);

  // Initial state based on unit
  const [data, setData] = React.useState({
    name: unit?.name || '',
    description: unit?.description || '',
    link: unit?.link || '',
    ecommerce: unit?.ecommerce || false,
    image: unit?.image || '', // Added image field
  });

  React.useEffect(() => {
    setData({
      name: unit?.name || '',
      description: unit?.description || '',
      link: unit?.link || '',
      ecommerce: unit?.ecommerce || false,
      image: unit?.image || '', // Updated when unit changes
    });
  }, [unit]);

  // Handle the switch change
  const handleEcommerceChange = (checked: boolean) => {
    setSelected(checked);
    setData({ ...data, ecommerce: checked });
  };

  // Handle input changes
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [field]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save
  const handleSave = async () => {
    try {
      setLoading(true);
      let imageUrl = data.image;

      if (file) {
        imageUrl = await uploadImage(file); // Upload image and get the URL
      }

      // Send only the fields that are updated (including the image if changed)
      await reqUpdateUnitById(unit?.id, {
        name: data.name,
        description: data.description,
        link: data.link,
        ecommerce: data.ecommerce,
        image: imageUrl,
      });

      toast.success('Guardado correctamente');
      console.log('Guardado correctamente')
    } catch (error) {
      console.error('Error updating unit:', error);
      toast.error('Error al guardar los cambios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className="relative w-[100px] h-[100px] p-2 cursor-pointer">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange} // Handle file change
        />
        <label htmlFor="fileInput" className="block w-full h-full">
          <img
            id="previewImage"
            src={data.image} // Use updated image from state
            alt="Preview Image"
            className="w-full h-full object-contain rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity rounded-lg">
            Editar
          </div>
        </label>
      </div>

      <div className='flex flex-col gap-1'>
        <span>Habilitar tienda en línea</span>
        <Switch
          isSelected={selected}
          onChange={(e) => handleEcommerceChange(e.target.checked)}
          aria-label="Automatic updates"
        />
      </div>

      <div className='flex flex-col gap-1'>
        <span>Nombre de unidad</span>
        <Input
          type="text"
          variant='underlined'
          placeholder="Nombre de la unidad"
          labelPlacement="outside"
          value={data.name}
          onChange={handleInputChange('name')}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <span>Descripción</span>
        <Input
          type="text"
          variant='underlined'
          placeholder="Descripción de la unidad"
          labelPlacement="outside"
          value={data.description}
          onChange={handleInputChange('description')}
        />
      </div>

      <div>
        <span className=''>Mi dominio</span>
        <div className='rounded-sm border-none outline-none'>
          <Input
            type="url"
            variant='underlined'
            placeholder="tuempresa.com"
            labelPlacement="outside"
            value={data.link}
            onChange={handleInputChange('link')}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">http://gestini.</span>
              </div>
            }
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">.com</span>
              </div>
            }
          />
        </div>
      </div>

      <Button color="primary" className='w-[100px] mt-2' onClick={handleSave} isLoading={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </Button>
    </div>
  );
};

export default Index;