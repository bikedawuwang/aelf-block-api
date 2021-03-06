/*
 * huangzongzhe
 * 2018.08
 */
'use strict';

const Controller = require('egg').Controller;
const formatOutput = require('../utils/formatOutput.js');

const transactionsRule = {
    address: 'string',
    limit: 'int',
	page: 'int'
};

class ApiController extends Controller {

    async getAllBlocks() {
        let ctx = this.ctx;
        try {
            let {limit, page, order} = ctx.request.query;
            let options = {
                limit: parseInt(limit, 10),
                page: parseInt(page, 10),
                order: order || 'DESC',
            };
            // ctx.validate(transactionsRule, options);
            let result = await ctx.service.api.getAllBlocks(options);
            formatOutput(ctx, 'get', result);
        } catch (error) {
            formatOutput(ctx, 'error', error, 422);
        }
    }

    async getTransactions() {
    	let ctx = this.ctx;
        try {
        	let {address, limit, page} = ctx.request.query;
        	let options = {
                address: address,
                limit: parseInt(limit, 10),
                page: parseInt(page, 10)
            };
            ctx.validate(transactionsRule, options);
            let result = await ctx.service.api.transactions(options);
            formatOutput(ctx, 'get', result);
        } catch (error) {
            formatOutput(ctx, 'error', error, 422);
        }
    }
    async postTransactions() {
    	let ctx = this.ctx;
        try {
            let {address, limit, page} = ctx.request.body;
            let options = {
                address: address,
                limit: parseInt(limit, 10),
                page: parseInt(page, 10)
            };
            ctx.validate(transactionsRule, options);
            let result = await ctx.service.api.transactions(options);
            formatOutput(ctx, 'post', result);
        } catch (error) {
            formatOutput(ctx, 'error', error, 422);
        }
    }
}

module.exports = ApiController;