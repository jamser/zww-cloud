package com.stylefeng.guns.common.persistence.dao;

import com.stylefeng.guns.common.persistence.model.MachinePhysicalProbability;
import com.stylefeng.guns.common.persistence.model.MachineProbability;
import com.stylefeng.guns.common.persistence.model.TDoll;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author liangchangchun
 * @since 2018-01-24
 */
public interface TDollMapper extends BaseMapper<TDoll> {

	List<Map<String, Object>> selectDolls(@Param("page") Page<TDoll> page,@Param("dollId") Integer dollId, @Param("name") String name, @Param("machineCode") String machineCode, @Param("machineStatus") String machineStatus,@Param("machineType") Integer machineType,@Param("modifiedBy") Integer modifiedBy);

	//机器排序
	List<TDoll> getDollListOrderByMachineCode();
	//概率机器
	List<TDoll> getDollListProbability();
	//占卜机器
	List<TDoll> getDollListDivination();

	//概率机器
	List<TDoll> getDollListByPhysical(@Param("list") List<MachinePhysicalProbability> list);

	//概率机器
	List<TDoll> getDollListByProbability(@Param("list") List<MachineProbability> list);

	TDoll getDollByMachineCode(@Param("machineCode") String machineCode);

	String getDollH5ByDollId(@Param("dollId") Integer dollId);

	int updateDollH5ByDollId(@Param("rtmpUrlH5") String rtmpUrlH5,@Param("dollId") Integer dollId);

	int insertDollH5(TDoll tDoll);
}