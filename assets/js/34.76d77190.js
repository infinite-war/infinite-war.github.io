(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{375:function(e,n,t){"use strict";t.r(n);var i=t(2),v=Object(i.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"dijkstra算法模板"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dijkstra算法模板"}},[e._v("#")]),e._v(" dijkstra算法模板")]),e._v(" "),t("p",[e._v("原理：①https://baike.baidu.com/item/%E8%BF%AA%E5%85%8B%E6%96%AF%E7%89%B9%E6%8B%89%E7%AE%97%E6%B3%95/23665989")]),e._v(" "),t("p",[e._v("②https://blog.csdn.net/goodxin_ie/article/details/88707966")]),e._v(" "),t("h1",{attrs:{id:"题1-得到要求路径的最小带权子图"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#题1-得到要求路径的最小带权子图"}},[e._v("#")]),e._v(" 题1：得到要求路径的最小带权子图")]),e._v(" "),t("p",[e._v("原题：https://leetcode-cn.com/problems/minimum-weighted-subgraph-with-the-required-paths/")]),e._v(" "),t("h2",{attrs:{id:"思路"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[e._v("#")]),e._v(" 思路：")]),e._v(" "),t("p",[t("strong",[e._v("最短路 & 枚举")])]),e._v(" "),t("p",[e._v("图论经典套路：枚举中间点。")]),e._v(" "),t("p",[e._v("记 "),t("code",[e._v("d1[i]")]),e._v("为从 "),t("code",[e._v("src1")]),e._v(" 出发到达点 "),t("code",[e._v("i")]),e._v("的最短路，"),t("code",[e._v("d2[i]")]),e._v(" 为从 "),t("code",[e._v("src2")]),e._v(" 出发到达点 i 的最短路。"),t("code",[e._v("d3[i]")]),e._v(" 为从点 "),t("code",[e._v("i")]),e._v(" 出发到达"),t("code",[e._v("dest")]),e._v("的最短路（可以将原图中所有边反向，然后从 "),t("code",[e._v("dest")]),e._v(" 出发跑 dijkstra 得到）。枚举中间点 "),t("code",[e._v("i")]),e._v("，答案就是 "),t("code",[e._v("min(d1[i] + d2[i] + d3[i])")]),e._v("。\n证明")]),e._v(" "),t("p",[e._v("上述解法的正确性建立在这一前提上：存在一种最优路径，使得 "),t("code",[e._v("src1")]),e._v(" 和 "),t("code",[e._v("src2")]),e._v(" 通向 "),t("code",[e._v("dest")]),e._v(" 的路径一旦重合就再也不会分开。上述做法其实就是在枚举公共路径中最开始的那个点。")]),e._v(" "),t("p",[e._v("这个前提也很容易证明。假设最优路径是 "),t("code",[e._v("src1 -> i -> j1 -> dest")]),e._v(" 和 "),t("code",[e._v("src2 -> i -> j2 -> dest")]),e._v("，那么点 "),t("code",[e._v("i")]),e._v("即可以走到"),t("code",[e._v("j1")]),e._v("，也可以走到 "),t("code",[e._v("j2")]),e._v("。假设"),t("code",[e._v("i -> j1 -> dest")]),e._v(" 的长度比"),t("code",[e._v("i -> j2 -> dest")]),e._v("更短，那 "),t("code",[e._v("src2 -> i -> j1 -> dest")]),e._v(" 更优。故上述前提成立")]),e._v(" "),t("div",{staticClass:"language-C++ extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("class Solution {\n    typedef pair<long long, int> pli;\n\n    int n;\n    //e1存储原本的有向边\n    //e2存储反转的有向边\n    vector<vector<int>> e1, e2;\n    //v1存储原来有向边的起点\n    //v2存储反转的有向边的起点\n    vector<vector<int>> v1, v2;\n\n    //dijstra算法可参考模板\n    vector<long long> dijkstra(int S, vector<vector<int>> &e, vector<vector<int>> &v) {\n        vector<long long> d(n);\n        for (int i = 0; i < n; i++) d[i] = -1;\n        priority_queue<pli> q;\n        q.push(pli(0, S));\n        while (!q.empty()) {\n            pli p = q.top(); q.pop();\n            int sn = p.second;\n            long long val = -p.first;\n            if (d[sn] >= 0) continue;\n            d[sn] = val;\n            for (int i = 0; i < e[sn].size(); i++) q.push(pli(-val - v[sn][i], e[sn][i]));\n        }\n        return d;\n    }\n\npublic:\n    long long minimumWeight(int n, vector<vector<int>>& edges, int src1, int src2, int dest) {\n        this->n = n;\n        //预处理\n        e1 = e2 = v1 = v2 = vector<vector<int>>(n);\n        for (auto &edge : edges) {\n            e1[edge[0]].push_back(edge[1]); v1[edge[0]].push_back(edge[2]);\n            e2[edge[1]].push_back(edge[0]); v2[edge[1]].push_back(edge[2]);\n        }\n        \n        vector<long long> d1 = dijkstra(src1, e1, v1);\n        vector<long long> d2 = dijkstra(src2, e1, v1);\n        vector<long long> d3 = dijkstra(dest, e2, v2);\n        long long ans = 1e18;\n        for (int i = 0; i < n; i++) if (d1[i] >= 0 && d2[i] >= 0 && d3[i] >= 0) ans = min(ans, d1[i] + d2[i] + d3[i]);\n        return ans < 1e18 ? ans : -1;\n    }\n};\n")])])])])}),[],!1,null,null,null);n.default=v.exports}}]);