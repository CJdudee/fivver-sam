import { connectingMongoose } from '@/app/lib/connectMongo'
import Packages from '@/models/Packages'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import _stripe from 'stripe'

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})


export async function POST(req: NextRequest, res: NextResponse) {

    const origin = req.headers.get('origin')
    
    const data = await req.json()

    const {packageId, userId, groupSize} = data

    if(!userId || !packageId || !groupSize) return NextResponse.json('You are missing key fields')

    console.log(packageId,'this is the packageId')

    await connectingMongoose()

    try {
        const packages: any = await Packages.find({
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

        const priceArray = [
            packages[0].priceOne.price,
            packages[0].priceTwo.price,
            packages[0].priceThree.price,
        ]
        
        console.log(groupSize, 'hit')
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
                tokens: `${tokensGained}`,
                for: `${groupSize}`
            },
            line_items: packages.map((product: any) => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: product.name, 
                        // random: '30430'
                    },
                    // unit_amount: product.price * 100
                    unit_amount: priceArray[groupSize - 1] * 100
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
        // return NextResponse.json({ url: session.url || ''})

        return new NextResponse(JSON.stringify({url: session.url || ''}), {
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'application/json',
            }
        })

    } catch (error) {
        
        let msg = ''

        if( error instanceof Error) {
            msg = error.message
        }

        return new NextResponse(JSON.stringify(msg), {
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'application/json',
            }
        })
    }


}