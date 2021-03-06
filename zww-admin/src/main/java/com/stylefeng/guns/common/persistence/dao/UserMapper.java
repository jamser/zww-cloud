package com.stylefeng.guns.common.persistence.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.stylefeng.guns.common.persistence.model.User;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
  * 管理员表 Mapper 接口
 * </p>
 *
 * @author stylefeng
 * @since 2017-07-11
 */
public interface UserMapper extends BaseMapper<User> {
    User selectByUsername(@Param("account") String account);

   int updateStatusByUsername(@Param("status") String status,@Param("account") String account);
}