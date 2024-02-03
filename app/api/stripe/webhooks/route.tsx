import Token from "@/models/Token";
import User from "@/models/User";
import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import _stripe from 'stripe'

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})


const endpointSecret = "whsec_6a0723723d67747712ef5b4b2d8a8c92968a108f2c6f3a163952e082c2b16a4a";

// whsec_6a0723723d67747712ef5b4b2d8a8c92968a108f2c6f3a163952e082c2b16a4a
// whsec_6a0723723d67747712ef5b4b2d8a8c92968a108f2c6f3a163952e082c2b16a4a

export async function POST(req: NextRequest, res: NextResponse) {

    // const data = await req.json();
    const data = await req.text()

    // const sig = request.headers['stripe-signature'];

    const sig = headers().get('stripe-signature')

    if(!sig) return NextResponse.json("There is a problem in the headers")

    // console.log(data, sig, 'data from the webhooks that is being sent')

    let event;

    try {
        event = stripe.webhooks.constructEvent(data, sig, endpointSecret);
    } catch (err) {

        let msg = ''

        if( err instanceof Error) {
            msg = err.message
        }
        // response.status(400).send(`Webhook Error: ${err.message}`);
        return NextResponse.json(msg);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':

          const paymentIntentSucceeded = event.data.object;
          console.log(paymentIntentSucceeded, 'lets see what this is')

          // const foundUser = await User.findOne({customerId: paymentIntentSucceeded.customer})

          // const stringNum = Number(paymentIntentSucceeded.metadata.tokens)

          // foundUser.tokens = stringNum
          
          // await foundUser.save()
        //   console.log(paymentIntentSucceeded, 'this is the succeeded')
          // Then define and call a function to handle the event payment_intent.succeeded
          break;

          case 'payment_intent.payment_failed':
            const payment_intent_payment_failed = event.data.object

            // console.log(payment_intent_payment_failed)
            break;

            case 'charge.succeeded':

            
              

            console.log('charge is succeeded')

            break

            case 'payment_intent.created': 

            //I way to go about this is to make a model for the broughtPackages and put the Id inside of the metadata which where we will search mongoose for the Id and then map over the Id for the packages which could then be added to the user
            console.log('Payment intent made')
            break


            case 'checkout.session.completed':

              const checkoutSession = event.data.object;
              console.log(checkoutSession, 'checkout session completed')

              const foundUser = await User.findOne({customerId: checkoutSession.customer})

              if(!foundUser) return NextResponse.json({error: 'No user was found!'})

              const stringNum = Number(checkoutSession.metadata!.tokens)

              const stringFor = Number(checkoutSession.metadata!.for)

              const createdToken = await Token.findOneAndUpdate({user: foundUser._id, groupSize: stringFor}, { $inc: { tokens: stringNum}}, {upsert: true, new: true, setDefaultsOnInsert: true})

              // foundUser.tokens += stringNum
              
              // await foundUser.save()

          // console.log(paymentIntentSucceeded, 'lets see what this is')
              
                //check out session is made even if the price of the item is free and if an invoiced is marked as paid, checkoutsession will still be made and could be used to save data to the database

                break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

    //   if(event.type == 'customer.created') {

    //       const createdCustomer = event.data.object

    //       if(createdCustomer.metadata.customerId) {
    //         const foundUser = await User.findOne({_id: createdCustomer.metadata.customerId})

    //         foundUser.customerId = createdCustomer.id

    //         await foundUser.save()
    //       }

    //     }
      
      console.log('hit')
    return NextResponse.json("this is the webhook that will be called")
}