import React from "react";
import { useSelector } from "react-redux";
import { Input, Button } from "@nextui-org/react";
import { reqUpdateUser } from "@renderer/api/requests";

const Index = () => {
    const user = useSelector((state: any) => state.user.user);
    const [loading, setLoading] = React.useState(false);
    console.log(user)

    const [data, setData] = React.useState({
        email: user?.email || "",
        username: user?.username || "",
        lastname: user?.lastname || "",
        firtsname: user?.firtsname || "",
        country: user?.country || "",
        jobposition: user?.jobposition || '',
        password: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    console.log(user?.username, data)

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await reqUpdateUser(user.username, data);
            alert('Datos actualizados con éxito');
        } catch (error) {
            console.error("Error actualizando los datos:", error);
            alert('Error al actualizar los datos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ml-[225px] px-[20px] mt-5 mb-5">
            <h6 className="text-[24px] font-semibold text-c-title">Información personal</h6>

            <div className="flex py-4 flex-col gap-4 md:flex-row">
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <Input
                        name="firtsname"
                        value={data.firtsname}
                        onChange={handleChange}
                        type="text"
                        label="Nombre"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.firtsname || 'Incompleto'}
                    />
                    <Input
                        name="lastname"
                        value={data.lastname}
                        onChange={handleChange}
                        type="text"
                        label="Apellido"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.lastname || 'Incompleto'}
                    />
                    <Input
                        name="country"
                        value={data.country}
                        onChange={handleChange}
                        type="text"
                        label="Ciudad"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.country || 'Incompleto'}
                    />
                    <Input
                        name="jobposition"
                        value={data.jobposition}
                        onChange={handleChange}
                        type="text"
                        label="Posición"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.jobposition || 'Incompleto'}
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <Input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        type="email"
                        label="Email"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.email || 'Incompleto'}
                    />
                    <Input
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        type="text"
                        label="Usuario"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.username || 'Incompleto'}
                    />
                    <Input
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        type="password"
                        label="Contraseña"
                        variant="bordered"
                        labelPlacement='outside'
                        className="rounded-none"
                        placeholder={data.password || 'Incompleto'}
                    />
                </div>
            </div>
            <div className="mt-4">
                <Button
                    className="bg-c-primary-variant-1 text-white"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </div>
    );
};

export default Index;
