/**
 * @file block.js
 * @author huangzongzhe
 * 2018.08
 */
// const Service = require('egg').Service;
const BaseService = require('../core/baseService');

class BlockService extends BaseService {

    // async getAllBlocks(options) {
    //     const aelf0 = this.ctx.app.mysql.get('aelf0');
    //     const { limit, page, order } = options;
    //     if (['DESC', 'ASC', 'desc', 'asc'].indexOf(order) > 0) {
    //         const offset = limit * page;
    //         let getBlocksSql = `select SQL_CALC_FOUND_ROWS * from blocks_0 ORDER BY block_height ${order} limit ? offset ?`;
    //         let getCountSql = `SELECT FOUND_ROWS()`;
    //         // return sql;
    //         let blocks = await aelf0.query(getBlocksSql, [limit, offset]);
    //         let count = await aelf0.query(getCountSql);
    //         // let result = await aelf0.query('select * from blocks_0 ORDER BY block_height ASC limit 10 offset 0');
    //         return {
    //             total: count[0]["FOUND_ROWS()"],
    //             blocks: blocks
    //         };
    //     }
    //     return '傻逼，滚。';
    // }

    async getTransactions(options) {
        const aelf0 = this.ctx.app.mysql.get('aelf0');
        const {limit, page, order, block_hash} = options;
        if (['DESC', 'ASC', 'desc', 'asc'].includes(order)) {
            const offset = limit * page;
            let getTxsSql
                = 'select * from transactions_0  where block_hash=?'
                + `ORDER BY block_height ${order} limit ? offset ? `;
            // let getTxsSql = `select SQL_CALC_FOUND_ROWS * from transactions_0  where block_hash=? ORDER BY block_height ${order} limit ? offset ? `;
            let getCountSql = 'select count(*) from transactions_0  where block_hash=?';
            // return sql;
            let txs = await this.selectQuery(aelf0, getTxsSql, [block_hash, limit, offset]);
            let count = await this.selectQuery(aelf0, getCountSql, [block_hash]);
            // let result = await aelf0.query('select * from blocks_0 ORDER BY block_height ASC limit 10 offset 0');
            return {
                total: count[0].total,
                transactions: txs
            };
        }
        return '傻逼，滚。';
    }
}

module.exports = BlockService;
