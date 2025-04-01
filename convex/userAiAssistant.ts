import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const InsertedSelectedAssistant = mutation({
    args: {
        records: v.any(),
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        const InsertedIds = await Promise.all(
            args.records.map(async (record: any) => (
                await ctx.db.insert('userAiAssistant', {
                    ...record,
                    uid: args.uid
                })
            ))

        )
        return InsertedIds;
    }
})

export const GetAllUserAssistants = query({
    args: {
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('userAiAssistant').filter(q => q.eq(q.field('uid'), args.uid)).collect();
        return result;
    }
})