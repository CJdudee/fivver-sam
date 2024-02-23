'use server'

import MonthlyOrder from "@/models/MonthlyOrder"
import { simpleJson } from "@/utils/helpers"

export const markMonthlyOrder = async(monthId: string) => {
    console.log(monthId)

    const foundMonth = await MonthlyOrder.findOne({_id: monthId})

    if(!foundMonth) return 

    foundMonth.paid = !foundMonth.paid

    const monthSave = await foundMonth.save()

    console.log(monthSave)

    return {data: simpleJson(monthSave), msg: 'Monthly Order has been marked'}

}