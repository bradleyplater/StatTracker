export default function StatsPanel() {
    return (
        <>
            <h3 className="mb-4 text-2xl font-bold">Stats</h3>
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th>Games Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Pims</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5</td>
                        <td>0</td>
                        <td>2</td>
                        <td>6</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
