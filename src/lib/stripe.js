import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export const  PLAN_PRICE_ID = {
    "seekers_pro" : "price_1TirX2FtlQfmvcV56ZLM7TyP",
    "seekers_premium" : "price_1TisU9FtlQfmvcV5Q90vIaRL",
    "recruiters_growth" : 'price_1TisVUFtlQfmvcV5et3Yy7oX',
    "recruiters_enterprise" : 'price_1TisWsFtlQfmvcV52vaTPjFU',
}