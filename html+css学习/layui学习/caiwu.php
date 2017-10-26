//财务详情
    function caiwu_info(){
        $_arr = ['ok'=>'n'];
        $page = (int)Req::post('page');
        $size = (int)Req::post('size');
        $typeid = Req::post('typeid');
        $content = Req::post('content');
        $status = Req::post('status');
        $username = Req::post('username');
        $tfrom = strtotime(Req::post('tfrom')?:'');
        $tto = strtotime(Req::post('tto')?:'');
        $where = [['AND', '`order`.user_id = member.id']];
        if($status != 'all') {
            $where[] = ['AND', '`order`.status = '.$status];
        }
        if($content != 'all') {
            $where[] = ['AND', '`order`.content = "'.$content.'"'];
        }
        if($typeid != 'all') {
            $where[] = ['AND', '`order`.typeid = '.$typeid];
        }
        if($username != '') {
            $where[] = ['AND', 'member.username  like "%'.$username.'%"'];
        }
        if ($tfrom) {
            if ($tto) {
                $where[] = ['AND', '(`order`.time between '.$tfrom.' AND '.$tto.')'];
            } else {
                $where[] = ['AND', '`order`.time >= '.$tfrom];
            }
        } elseif ($tto) {
            $where[] = ['AND', '`order`.time <= '.$tto];
        }
        if($page <=0 ||$size <=0 ) {
            $_arr['e'] = '参数错误';
        } else {
           $count = P()->table(['order','member'])->where($where)->field('count(`order`.id)')->one();
           $_arr['sql']=Sql::$sql;
           $_arr['where']= $where;
           if($count == 0){
               $_arr['e'] = '暂无数据';
           }
           else{
               $allpage = ceil($count/$size);
               if($page <= $allpage){
                   $limit = ($page - 1)*$size;
                   $_arr['list'] = P()->table(['order','member'])->where($where)->limit([$limit,$size])->order('`order`.time desc')->field('`order`.*,member.username')->select();
                   $_arr['page'] = $allpage;
                   $_arr['count'] = $count;
                   $_arr['ok'] = 'y';
               } else {
                   $_arr['e'] = '页码错误';
               }
           }
           P()->close();
        }
        $this->backInfo($_arr);
    }
    
}