import {getAllStickersForDashboard, getTableStickers} from '@/lib/actions/sticker.actions'
import {getAllUsers} from '@/lib/actions/user.actions'
import StickersGraph from '@/components/dashboard/StickersGraph'
import StickersTable from '@/components/dashboard/StickersTable'
import StickerData from '@/components/dashboard/StickerData'
import { auth } from '@clerk/nextjs/server'
import { SearchParamProps } from '@/types'
const Dashboard = async ({searchParams}: SearchParamProps) => {

  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;
  console.log(userId)

  function createDailyCountArray(data: any) {
    const currentDate = new Date(); // Current date
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of current month
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of current month
  
    const dailyCounts: any = {};
  
    // Initialize dailyCounts with 0 counts for each day in the month
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      dailyCounts[formattedDate] = 0;
    }
  
    // Count occurrences of each date in the dataset
    data.forEach((item: any) => {
      // Parse createdAt string to Date object
      const createdAtDate = new Date(item.createdAt);
  
      // Ensure createdAtDate is valid before proceeding
      if (!isNaN(createdAtDate.getTime())) {
        const dateKey = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')}`;
        console.log(createdAtDate.getDate())
        if (dailyCounts[dateKey] !== undefined) {
          dailyCounts[dateKey]++;
        }
      }
    });
  
    // Convert dailyCounts object to array of objects with x and y properties
    const result = Object.keys(dailyCounts).map(date => {
      return { x: date, y: dailyCounts[date] };
    });
  
    return result;
  }

  const tableStickers = await getTableStickers()

  const stickers = await getAllStickersForDashboard()
  const stickerId = (searchParams?.stickerId as string ) || tableStickers[0].id;

  const users = await getAllUsers()

  return (
    <div>
      <header>
        <p>This is a testing dashboard to showcase my skills, using ui.shadcn.com</p>
      </header>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <StickersGraph data={createDailyCountArray(stickers)} stickers={stickers} users={users}/>
              <StickersTable stickersString={JSON.stringify(tableStickers)}/>
            </div>
            <div>
              <StickerData stickers={tableStickers} selectedSticker={stickerId} userId={userId}/>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}


export default Dashboard;