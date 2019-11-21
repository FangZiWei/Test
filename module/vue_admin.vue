<template>
    <div class="app-container">
        <div class="filter-container">

            <div class="app-container">
                <div class="filter-container">

                </div>
            </div>
            <el-input
                v-model="listQuery.val_order"
                placeholder="输入订单号"
                style="width: 200px;"
                class="filter-item"
                />

            <el-date-picker
                v-model="listQuery.val_date"
                class="filter-item"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
            <el-select v-model="listQuery.val_transType" class="filter-item">
                <el-option v-for="item in transTypeOption" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
            <el-checkbox v-model="listQuery.val_autoFresh" class="filter-item" style="margin-left:15px;" @change="autoFresh">
                自动刷新
            </el-checkbox>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
                查询
            </el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            >
            <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                    <span>{{ listQuery.page ? (listQuery.page - 1) * listQuery.limit + scope.$index + 1 : scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Name" align="center">
                <template slot-scope="{row}">
                    <span>{{ row }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template v-show="false" slot-scope="{row}">
                    <div v-show="row.State == 1 && row.LockState == 0">
                        <el-button type="primary" size="mini" @click="order_lock(row)">
                            锁定
                        </el-button>
                    </div>
                    <div>
                        <el-button type="primary" size="mini" @click="row_edit(row)">
                            修改
                        </el-button>
                        <el-button type="draft" size="mini" @click="row_dele(row)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {
    ShowSuccessMsg, ShowErrorMsg, CheckCBError,
    defaultDate, getCurrentDate, getCurrentDatePlus, 
    FormatDataByStringbySecond, FormatByte } from '@/utils/common'

export default {
    // 卡对卡转账
    name: 'C2CTransfer',
    data() {
        return {
            list: null,
            listLoading: false,
            listQuery: {
                val_date: defaultDate(),
                val_transType: '等待支付',
                val_autoFresh: false,
            },
            transTypeOption: [
                { label: '全部支付', key: '全部支付' },
                { label: '忽略支付', key: '忽略支付' },
                { label: '完成支付', key: '完成支付' },
                { label: '等待支付', key: '等待支付' }
            ]
        }
    },
    created() {

    },
    watch: {

    },
    methods: {
        handleSearch() {
            this.getList()
        },
        autoFresh() {
            if (this.listQuery.val_autoFresh) {
                // 延时刷新
            }
        },

        // ws_KK_GetDingDan
        getList(pageIndex) {
            this.listLoading = true
            pageIndex = pageIndex || 0
            if (!this.listQuery.val_date) {
                ShowErrorMsg("时间不能为空！")
            } else {
                var params = [];
                params[0] = FormatDataByStringbySecond(this.listQuery.val_date[0])
                params[1] = FormatDataByStringbySecond(this.listQuery.val_date[1])
                params[2] = this.listQuery.val_transType
                this.$store.state.ws.WsObj.SendMsg("KK_GetDingDan", params, this, this.CBws_KK_GetDingDan);
            }
        },
        CBws_KK_GetDingDan(data, err) {
            if (CheckCBError(err, true)) return;

            this.list = data
        }

    }
}
</script>

<style lang="scss">
    
</style>
