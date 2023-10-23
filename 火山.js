/**
 * 
 * 项目类型：APP
 * 项目下载：https://
 * 项目名称：抖音火山版
 * 项目更新：2023-08-14
 * 项目抓包：抓hotsoon.snssdk.com下的url里面的iid开始抓url#cookie#x-argus#x-ladon#ua填入变量
 * 项目变量：lekebo_dyhsb_Cookie
 * 项目定时：每30分钟运行一次
 * 定时规则: * 30 * * * *
 * 
 * 邀 请 码: 
 * 
 * github仓库：https://github.com/qq274023/lekebo
 * 
 * 交流Q群：104062430 作者:乐客播 欢迎前来提交bug
 */


const $ = new Env("抖音火山版");
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 0;		      //通知设置      0关闭  1开启
let debug = 0;                //Debug调试     0关闭  1开启
let envSplitor = ["@", "\n"]; //多账号分隔符
let ck = msg = '';            //let ck,msg
let versionupdate = "0";      //版本对比升级   0关闭  1开启
//===============脚本版本=================//
let scriptVersion = "v1.0";
let update_tines = "2023-08-28";
let update_data = "2023-05-22";
let scriptVersionLatest = "v1.0"; //版本对比
let userCookie = ($.isNode() ? process.env.lekebo_dyhsb_Cookie : $.getdata('lekebo_dyhsb_Cookie')) || '';
let userList = [];
let userIdx = 0;
let userCount = 0;
let curTime = new Date();
let curHour = curTime.getHours();
let times = Math.round(new Date().getTime() / 1000).toString();
let timestamp = Math.round(new Date().getTime()).toString();
let host = 'hotsoon.snssdk.com';
let hostname = 'https://' + host;
//---------------------- 自定义变量区域 -----------------------------------
async function start() {
    taskall = [];
    for (let user of userList) {
        taskall.push(await user.getMemberScore(2 * 1000));
        await $.wait(1000);
    }
    await Promise.all(taskall);
    // DoubleLog(`\n================ 执行账号签到赚钱 ================`)
    // taskall = [];
    // for (let user of userList) {
    //     taskall.push(await user.signin(2 * 1000));
    //     await $.wait(1000);
    // }
    // await Promise.all(taskall);
    DoubleLog(`\n================ 执行开宝箱赚金币 ================`)
    taskall = [];
    for (let user of userList) {
        taskall.push(await user.treasure(2 * 1000));
        await $.wait(1000);
    }
    await Promise.all(taskall);
    DoubleLog(`\n================ 执行看广告赚金币 ================`)
    taskall = [];
    for (let user of userList) {
        taskall.push(await user.video(2 * 1000));
        await $.wait(1000);
    }
    await Promise.all(taskall);
    // DoubleLog(`\n================ 执行逛街浏览赚钱 ================`)
    // taskall = [];
    // for (let user of userList) {
    //     taskall.push(await user.shopping(2 * 1000));
    //     await $.wait(1000);
    // }
    // await Promise.all(taskall);
}

class UserInfo {
    constructor(str) {
        this.index = ++userIdx;
        this.ck = str.split('#');
    }
// ============================================执行项目============================================ \\
    async getMemberScore(timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/janus/flame/management/panel/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/json',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
            }
            $.get(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            let score = result.data.user_flame_info.data.td_flame_count;
                            let cash = (result.data.user_flame_info.data.td_flame_count / 30000).toFixed(2);
                            DoubleLog(`\n ✅ 【${this.index}】收益状况: 拥有 ${score} 金币,余额 ${cash}元`)
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】收益状况: ${result.err_tips}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async signin(timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/janus/flame/management/panel/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/json',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
            }
            $.get(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            console.log(result)
                            if(result.data.user_flame_info.data && Array.isArray(result.data.user_flame_info.data)) {
                                for(let i=0; i < result.data.user_flame_info.data.length; i++) {
                                    let taskItem = result.data.user_flame_info.data[i];
                                    console.log(taskItem)
                                }
                            }
                            
                            DoubleLog(`\n ✅ 【${this.index}】签到信息: 获得 ${score} 金币`)
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】签到信息: ${result.status_message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async treasure(timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/janus/flame/management/panel/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/json',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
            }
            $.get(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            if (result.data.treasure_chest_info.data.token == null) {
                                DoubleLog(`\n ❌ 【${this.index}】打开宝箱: 今日宝箱个广告已达上限,请明日再来`)
                            } else {
                                let token = result.data.treasure_chest_info.data.token;
                                let next_time= result.data.treasure_chest_info.data.last_award_timestamp + result.data.treasure_chest_info.data.cooling_time;
                                let cur_time = Math.round(new Date().getTime() / 1000).toString();
                                if (next_time <= cur_time || token != null) {
                                   DoubleLog(`\n ✅ 【${this.index}】打开宝箱: 正在执行获取宝箱任务请等待...`);
                                    await $.wait(1000);
                                    await this.open_treasure(result.data.treasure_chest_info.data.token,2 * 1000);
                                } else {
                                    DoubleLog(`\n ❌ 【${this.index}】打开宝箱: 下次开宝箱：${$.time('yyyy-MM-dd HH:mm:ss', next_time * 1000)}`);
                                }
                            }
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】打开宝箱: ${result.status_message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_treasure(boxtoken,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_check_in&auto_finish=false&token=${boxtoken}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】打开宝箱: 获得${result.data.task_done_award.flame_amount}金币金币,广告预计${result.data.treasure_chest_ad_info.ad_award_flame_count}金币`);
                            await this.open_treasure_video(result.data.treasure_chest_ad_info.ad_token,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】打开宝箱: ${result.data.prompts}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_treasure_video(boxtoken,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad&auto_finish=false&token=${boxtoken}&history_total_award_key=`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            let chestad = result.data.task_done_award.history_total_award_key;
                            let result1 = encodeURIComponent(chestad);
                            DoubleLog(`\n ✅ 【${this.index}】宝箱广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                            await this.one_treasure_video(result1, 2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】宝箱广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async one_treasure_video(boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/ad/one_more/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad&one_more_index=0`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0 && result.data.has_one_more == true) {
                            await this.open_onetreasure_video(result.data.next_token,boxid,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ `)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_onetreasure_video(boxtoken,boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad_one_more_1&token=${boxtoken}&history_total_award_key=${boxid}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】追加广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                            await $.wait(20000);
                            await this.two_treasure_video(boxid, 2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】追加广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async two_treasure_video(boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/ad/one_more/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad_one_more_1&one_more_index=1`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0 && result.data.has_one_more == true) {
                            await $.wait(20000);
                            await this.open_twotreasure_video(result.data.next_token,boxid,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ `)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_twotreasure_video(boxtoken,boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad_one_more_2&token=${boxtoken}&history_total_award_key=${boxid}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】二次追加广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                            await this.three_treasure_video(boxid, 2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】二次追加广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }async three_treasure_video(boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/ad/one_more/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad_one_more_2&one_more_index=2`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0 && result.data.has_one_more == true) {
                            await $.wait(20000);
                            await this.open_threetreasure_video(result.data.next_token,boxid,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ `)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_threetreasure_video(boxtoken,boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=treasure_chest_ad_one_more_3&token=${boxtoken}&history_total_award_key=${boxid}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】三次追加广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】三次追加广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async video(timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/janus/flame/management/panel/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/json',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
            }
            $.get(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0 ) {
                            if(result.data.task_info.data.task_list && Array.isArray(result.data.task_info.data.task_list)) {
                                for(let i=0; i < result.data.task_info.data.task_list.length; i++) {
                                    let taskItem = result.data.task_info.data.task_list[i];
                                    if (taskItem.ad_task != null) {
                                        if (taskItem.ad_task.action_type == "jsb") {
                                            let next_time= taskItem.ad_task.last_award_timestamp + taskItem.ad_task.cooling_time;
                                            let cur_time = Math.round(new Date().getTime() / 1000).toString();
                                            if (next_time <= cur_time) {
                                                await this.open_video(taskItem.ad_task.token,2 * 1000);
                                            } else {
                                                DoubleLog(`\n ❌ 【${this.index}】广告赚金: 下次广告：${$.time('yyyy-MM-dd HH:mm:ss', next_time * 1000)}`);
                                            }
                                        }
                                    }
                                }
                            }    
                            if (result.data.task_info.data.hasOwnProperty("new_user_task_part")){    
                                if(result.data.task_info.data.new_user_task_part.task_list && Array.isArray(result.data.task_info.data.new_user_task_part.task_list)) {
                                    for(let i=0; i < result.data.task_info.data.new_user_task_part.task_list.length; i++) {
                                        let taskItem = result.data.task_info.data.new_user_task_part.task_list[i];
                                        if (taskItem.ad_task != null) {
                                            if (taskItem.ad_task.action_type == "jsb") {
                                                let next_time= taskItem.ad_task.last_award_timestamp + taskItem.ad_task.cooling_time;
                                                let cur_time = Math.round(new Date().getTime() / 1000).toString();
                                                if (next_time <= cur_time) {
                                                    await this.open_video(taskItem.ad_task.token,2 * 1000);
                                                } else {
                                                    DoubleLog(`\n ❌ 【${this.index}】广告赚金: 下次广告：${$.time('yyyy-MM-dd HH:mm:ss', next_time * 1000)}`);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
            } else {
                            DoubleLog(`\n ❌ 【${this.index}】广告视频: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_video(boxtoken,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad&token=${boxtoken}&history_total_award_key=`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            let chestad1 = result.data.task_done_award.history_total_award_key;
                            let result2 = encodeURIComponent(chestad1);
                            DoubleLog(`\n ✅ 【${this.index}】广告视频: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`);
                            await this.one_vtreasure_video(result2, 2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】广告视频: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async one_vtreasure_video(boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/ad/one_more/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad&one_more_index=0`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            await this.open_vonetreasure_video(result.data.next_token,boxid,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ `)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_vonetreasure_video(boxtoken,boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad_one_more_1&token=${boxtoken}&history_total_award_key=${boxid}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】追加广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                            await $.wait(20000);
                            await this.two_vtreasure_video(boxid, 2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】追加广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async two_vtreasure_video(boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/ad/one_more/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad_one_more_1&one_more_index=1`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            await $.wait(20000);
                            await this.open_vtwotreasure_video(result.data.next_token,boxid,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ `)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_vtwotreasure_video(boxtoken,boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad_one_more_2&token=${boxtoken}&history_total_award_key=${boxid}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】二次追加广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                            await this.three_vtreasure_video(boxid, 2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】二次追加广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }async three_vtreasure_video(boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/ad/one_more/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad_one_more_2&one_more_index=2`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            await $.wait(20000);
                            await this.open_vthreetreasure_video(result.data.next_token,boxid,2 * 1000);
                        } else {
                            DoubleLog(`\n ❌ `)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_vthreetreasure_video(boxtoken,boxid,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
				    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=ad_one_more_3&token=${boxtoken}&history_total_award_key=${boxid}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】三次追加广告: 获得奖励 ${result.data.task_done_award.flame_amount} 金币`)
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】三次追加广告: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async shopping(timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/janus/flame/management/panel/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/json',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
            }
            $.get(url, async (error, response, data) => {
                console.log(data)
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            if(result.data.task_info.data.task_list && Array.isArray(result.data.task_info.data.task_list)) {
                                for(let i=0; i < result.data.task_info.data.task_list.length; i++) {
                                    let taskItem = result.data.task_info.data.task_list[i];
                                    if (taskItem.ad_task == null) {
                                        if (taskItem.task_name == "shopping_flame") {
                                            let next_time= taskItem.shopping_flame_task.activity_page_info.ready_time + taskItem.shopping_flame_task.count_down_seconds;
                                            let cur_time = Math.round(new Date().getTime() / 1000).toString();
                                            if (next_time <= cur_time) {
                                                DoubleLog(`\n ❌ 【${this.index}】逛街赚钱: 每天可完成10次, 已完成 ${taskItem.shopping_flame_task.activity_page_info.completed_times}/10 次`);
                                                await this.open_shopping(taskItem.shopping_flame_task.activity_page_info.token,2 * 1000);
                                            } else {
                                                DoubleLog(`\n ❌ 【${this.index}】逛街赚钱: 下次开宝箱：${$.time('yyyy-MM-dd HH:mm:ss', next_time * 1000)}`);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】逛街赚钱: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
    async open_shopping(boxtoken,timeout = 2000) {
        return new Promise((resolve) => {
            let url = {
                url: `${hostname}/hotsoon/flame/task_system/task_done/?${this.ck[0]}`,
                headers: {
				    Host: host,
                    'Connection': 'Keep-Alive',
				    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-vc-bdturing-sdk-version': '3.7.0.cn',
                    'sdk-version': '2',
					'passport-sdk-version': '203157',
                    'Cookie': this.ck[1],
                    'x-argus': this.ck[2],
                    'x-ladon': this.ck[3],
                    'User-Agent': this.ck[4],
                },
                body: `task_name=shopping_flame&token=${boxtoken}`,
            }
            $.post(url, async (error, response, data) => {
                try {
                    if (error) {
                        $.logErr(error);
                    } else {
                        let result = JSON.parse(data);
                        if (result.status_code == 0) {
                            DoubleLog(`\n ✅ 【${this.index}】逛街奖励: 获得奖励 ${result.data.shppping_flame_done_info.amount} 金币`);
                        } else {
                            DoubleLog(`\n ❌ 【${this.index}】逛街奖励: ${result.data.message}`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            }, timeout)
        })
    }
}
// ============================================结束项目============================================ \\
!(async () => {
    if (!(await checkEnv())) return;
    if (userList.length > 0) {
        DoubleLog(`\n 🎉 交流Q群：104062430 作者:乐客播 欢迎前来提交bug`);
        DoubleLog(`\n================ 共找到 ${userList.length} 个账号 ================ \n\n 脚本执行✌北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()} `);
        if (versionupdate == 1) {
            await getVersion();
            DoubleLog(`\n================ 版本对比检查更新 ===============`)
            if (scriptVersionLatest != scriptVersion) {
                DoubleLog(`\n 当前版本：${scriptVersion}，更新时间：${update_tines}`)
                DoubleLog(`\n 最新版本：${scriptVersionLatest}`)
                DoubleLog(`\n 更新信息：${update_data}`)
            } else {
                DoubleLog(`\n 版本信息：${scriptVersion} ，已是最新版本无需更新开始执行脚本`)
            }
        } else {
            DoubleLog(`\n================ 版本对比检查更新 ===============`)
            DoubleLog(`\n 当前版本:${scriptVersion}，更新时间:${update_tines}，已设不更新版本`);
        }
        DoubleLog(`\n================ 开始执行会员脚本 ===============`)
        if (userList.length > 10) {
            DoubleLog(`\n\n 系统提示：你的账号已超出作者指定的数量暂时不执行脚本\n\n`);
        } else {
            await start();
        }
    }
    //await SendMsg(msg);
})()
    .catch((e) => console.log(e))
    .finally(() => $.done());
// ============================================变量检查============================================ \\
async function checkEnv() {
    if (userCookie) {
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
        userCount = userList.length;
    } else {
        console.log("\n 乐客播提示：系统变量未填写 Token");
        return;
    }
    return true;
}
// ============================================获取远程版本============================================ \\
function getVersion(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://ghproxy.com/https://raw.githubusercontent.com/qq274023/lekebo/master/lekebo_kww.js`,
        }
        $.get(url, async (err, resp, data) => {
            try {
                scriptVersionLatest = data.match(/scriptVersion = "([\d\.]+)"/)[1]
                update_data = data.match(/update_data = "(.*?)"/)[1]
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
// ============================================项目所需参数============================================ \\
/**
 * 随机数生成
 */
function randomString(e) {
    e = e || 32;
    var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}
function randomsstring(e, t = "abcdefhijkmnprstwxyz123456789") {
        e = e || 32;
        let a = t.length,
            n = "";
        for (let i = 0; i < e; i++)
            n += t.charAt(Math.floor(Math.random() * a));
        return n
    }
function randomNum(min, max) {
	if (arguments.length === 0) return Math.random()
	if (!max) max = 10 ** (Math.log(min) * Math.LOG10E + 1 | 0) - 1
	return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * 随机UA
 * @param inputString
 * @returns {*}
 */
function getUA() {
	$.UUID = randomString(40)
	const buildMap = {
		"167814": `10.1.4`,
		"167841": `10.1.6`,
		"167853": `10.2.0`
	}
	$.osVersion = `${randomNum(13, 14)}.${randomNum(3, 6)}.${randomNum(1, 3)}`
	let network = `network/${['4g', '5g', 'wifi'][randomNum(0, 2)]}`
	$.mobile = `iPhone${randomNum(9, 13)},${randomNum(1, 3)}`
	$.build = ["167814", "167841", "167853"][randomNum(0, 2)]
	$.appVersion = buildMap[$.build]
	return `jdapp;iPhone;${$.appVersion};${$.osVersion};${$.UUID};M/5.0;${network};ADID/;model/${$.mobile};addressid/;appBuild/${$.build};jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ${$.osVersion.replace(/\./g, "_")} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
}
/**
 * 随机延时1-30s，避免大家运行时间一样
 * @returns {*|number}
 */
function delay() {
    let time = parseInt(Math.random() * 100000);
    if (time > 30000) {// 大于30s重新生成
        return delay();
    } else {
        console.log('随机延时：', `${time}ms, 避免大家运行时间一样`)
        return time;// 小于30s，返回
    }
}
// ============================================结束项目所需参数============================================ \\
function DoubleLog(data) { if ($.isNode()) { if (data) { console.log(`${data}`); msg += `${data}` } } else { console.log(`${data}`); msg += `${data}` } }
async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message) } else { $.msg($.name, '', message) } } else { console.log(message) } }
function MD5Encrypt(a) { function b(a, b) { return a << b | a >>> 32 - b } function c(a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d(a, b, c) { return a & b | ~a & c } function e(a, b, c) { return a & c | b & ~c } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
