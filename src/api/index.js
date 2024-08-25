export async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const DesignationData = () => fetchData(`${process?.env?.NEXT_PUBLIC_API}/hrvdesignation/findAllHrvdesignationByAsStatus`);
export const AllEmployee = () => fetchData(`${process?.env?.NEXT_PUBLIC_API}/bovEmpInfo/findAllBovEmployeeInfos`);
export const AllLocationEmployee = () => fetchData(`${process?.env?.NEXT_PUBLIC_API}/empTrackInfo/allEmpGpsTrackInfos`);
