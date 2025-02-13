import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Forum({auth}){
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        

        </AuthenticatedLayout>
    )
}