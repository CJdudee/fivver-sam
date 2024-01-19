import { connectingMongoose } from '@/app/lib/connectMongo'
import Packages from '@/models/Packages'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import _stripe from 'stripe'

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})


export async function POST(req: NextRequest, res: NextResponse) {
    
    const data = await req.json()

    const {packageId, userId} = data

    if(!userId) return NextResponse.json('You are missing key fields')

    console.log(packageId,'this is the packageId')

    await connectingMongoose()

    try {
        const packages: [] = await Packages.find({
            _id: packageId
        }).exec()

        console.log(packages, 'this is package')

        if (!packages) return NextResponse.json({ empty: "Package was not found"})

        // const mappedPackages = packages.map((p: any) => ({
        //     ...p,
        //     quantity: packages.find((product: any) => product.id == p._id)?.quantity || 0
        // }))

        if(packages.length == 0) return NextResponse.json("Package not available ")


        const foundUser = await User.findOne({_id: userId})

        if(!foundUser) return NextResponse.json('No user was found with that id')

        let tokensGained = 0


        packages.map((p: any) => {
            tokensGained += p.tokens
        })

        // const tokensGained = packages.reduce((adder: any, currentValue: any) => {
        //     return adder.tokens + currentValue
        // }, 0)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer: foundUser.customerId,
            // metadata: {
            //     items: ''
            // },
            metadata: {
                tokens: `${tokensGained}`
            },
            line_items: packages.map((product: any) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name, 
                        // random: '30430'
                    },
                    unit_amount: product.price * 100
                },
                // quantity: product.quantity,
                quantity: 1,
                
            })),
            // shipping_options: [
            //     {
            //         shipping_rate_data: {
            //             type: 'fixed_amount',
            //             fixed_amount: {
            //                 amount: 0,
            //                 currency: 'usd'
            //             },
            //             display_name: "Ready to go"
            //         }
            //     }
            // ],
            success_url: `${process.env.HOSTNAME}/success`,
            cancel_url: `${process.env.HOSTNAME}/pricing`
        })

        console.log(session, 'this is the session for stripe')
        return NextResponse.json({ url: session.url || ''})

    } catch (error) {
        
        let msg = ''

        if( error instanceof Error) {
            msg = error.message
        }

        return NextResponse.json(msg)
    }


}